const Express = require("express");
const router = Express.Router();
const Context = require("../model/ContextFlow");
const ContextValue = require("../model/ContextValue");
const WordPhrases = require("../model/WordPhrase");
const ObjectId = require("mongodb").ObjectID;
const { htmlToText } = require("html-to-text");
router.post("/context-value", async (req, res) => {
  var contextvalue_id = "_v".concat(req.body.id);
  const value = await getIds(req.body.value);
  var valueId = value._id.toString();
  const obj = {};
  obj[valueId] = req.body.contextvalue;
  const e = await ContextValue.exists({ _id: contextvalue_id });
  if (e) {
    const check = await ContextValue.findOne({ _id: contextvalue_id });
    if (check.contextvalue[valueId] === undefined) {
      const cValue = JSON.parse(req.body.contextvalue.replace(/<[^>]+>/g, ""));
      cValue.position = Object.keys(check.contextvalue).length + 1;
      const u = JSON.stringify(cValue);
      const text = `<p>${u}</p>`;
      check.contextvalue[valueId] = text;
    } else if (check.contextvalue[valueId] !== undefined) {
      const pos = JSON.parse(
        check.contextvalue[valueId].replace(/<[^>]+>/g, "")
      ).position;
      const JObj = JSON.parse(req.body.contextvalue.replace(/<[^>]+>/g, ""));
      JObj.position = pos;
      const stringJObj = JSON.stringify(JObj);
      const saveObj = `<p>${stringJObj}</p>`;
      check.contextvalue[valueId] = saveObj;
    }
    var update_contextvalue = new ContextValue(check);
    update_contextvalue.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  } else {
    const firstObj = JSON.parse(obj[valueId].replace(/<[^>]+>/g, ""));
    firstObj.position = 1;
    const stringObj = JSON.stringify(firstObj);
    const markupObj = `<p>${stringObj}</p>`;
    obj[valueId] = markupObj;
    var new_contextvalue = new ContextValue({
      _id: contextvalue_id,
      contextvalue: obj,
    });
    new_contextvalue.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  }
});

router.get("/get-context-value", async (req, res) => {
  const query = JSON.parse(req.query.payload);
  var context_value_id = "_v".concat(query.id);
  const wp = await WordPhrases.findOne({ wp: query.wp });
  const wp_id = wp._id.toString();
  ContextValue.findById(context_value_id, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.send({ value: docs !== null ? docs.contextvalue[wp_id] : null });
    }
  });
});

router.get("/get-all-context-value", async (req, res) => {
  const query = JSON.parse(req.query.payload);
  ContextValue.findOne(
    { _id: "_v".concat(query.id) },
    async function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        if (docs !== null) {
          const arrayOfObj = Object.entries(docs.contextvalue).map((e) => ({
            // [e[0]]: e[1],
            value: htmlToText([e[1]], {
              wordwrap: 130,
            }),
            id: e[0],
          }));

          for (let f of arrayOfObj) {
            var w = await getWpByID(f.id);
            var text = htmlToText(f.value, {
              wordwrap: 130,
            });
            var parseObj = JSON.parse(text);

            if (parseObj.ctx !== undefined) {
              var contextData = await getContextByID(ObjectId(parseObj.ctx));
              if (contextData !== null) {
                const contextvalue_data = await getContextValueByID(
                  "_v".concat(contextData._id.toString())
                );
                if (contextvalue_data) {
                  const v = contextvalue_data.contextvalue;
                  var valueArr = [];
                  for (let y in v) {
                    var planetext = htmlToText(v[y], {
                      wordwrap: 0,
                    });
                    const parsed_v = JSON.parse(planetext);
                    parsed_v.id = y;
                    valueArr.push(parsed_v);
                  }
                  valueArr.sort((a, b) =>
                    a.position > b.position
                      ? 1
                      : b.position > a.position
                      ? -1
                      : 0
                  );
                  f.value = valueArr;
                  f.va = "_v".concat(contextData._id.toString());
                } else {
                  f.value = [
                    { cValue: "context value not found", type: "invalid" },
                  ];
                  f.va = "invalid";
                }
              } else {
                f.value = [
                  { cValue: "context value not found", type: "invalid" },
                ];
                f.va = "invalid";
              }
            } else if (parseObj.cValue !== undefined) {
              f.value = [parseObj];
              f.va = "invalid";
            } else {
              f.value = [{ cValue: "invalid json", type: "invalid" }];
              f.va = "invalid";
            }

            f.wp = w.wp;
          }

          res.send(arrayOfObj);
        } else {
          res.send(null);
        }
      }
    }
  );
});

router.get("/ctx/:id", async (req, res) => {
  var s = req.params.id;
  var res_data = s.split(".");
  var domain = await getIds(res_data[0]);
  var flow = await getIds(res_data[1]);
  var type = res_data[2];
  var contextsq = await getIds(res_data[3]);

  if (domain !== null && flow !== null && type && contextsq !== null) {
    const server_data = await Context.find({
      $and: [
        { "contexts.domain": domain._id.toString() },
        { "contexts.flow": flow._id.toString() },
        { "contexts.contexttype": type },
      ],
    });

    const data = server_data[0].contexts.atttentionentities;
    const check = data.includes(contextsq._id.toString());
    const value_id = "_v".concat(server_data[0]._id);
    const result = await getContextValueByID(value_id);
    if (result !== null) {
      const reasults = result.contextvalue[contextsq._id.toString()];

      if (check && reasults !== undefined) {
        res.send(reasults);
      } else {
        res.send("context sequence not found");
      }
    } else {
      res.send("context sequence not found");
    }
  } else {
    res.send("context sequence not found");
  }
});

router.put("/update-context-value", async (req, res) => {
  ContextValue.findById(req.body.adress, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      for (let v of req.body.value) {
        docs.contextvalue[v.id] = `<p>${JSON.stringify(v)}</p>`;
      }

      var updated_contextvalue = new ContextValue(docs);
      updated_contextvalue.save(function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log("saved");
        }
      });
    }
  });
});
router.post("/cv-image-upload", async (req, res) => {
  try {
    const { id, wp, entityImage } = req.body;
    console.log(id, wp, entityImage);
    const wp_id = await WordPhrases.findOne({ wp: wp });

    const ctx = await ContextValue.findOne({ _id: "_v".concat(id) });
    const value = JSON.parse(
      ctx.contextvalue[wp_id._id].replace(/<[^>]+>/g, "")
    );
    value.image = entityImage;
    ctx.contextvalue[wp_id._id] = `<p>${JSON.stringify(value)}</p>`;
    const updatedCtx = new ContextValue(ctx);

    await updatedCtx
      .save()
      .then(() => {
        res.send({ success: true });
      })
      .catch((err) => {
        res.send({ error: true });
      });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;

function getIds(d) {
  return WordPhrases.findOne({ wp: d });
}

function getWpByID(data) {
  return WordPhrases.findById(data).then((res) => {
    return res;
  });
}

function getContextValueByID(data) {
  return ContextValue.findById(data).then((res) => {
    return res;
  });
}

function getContextByID(data) {
  return Context.findById(data).then((res) => {
    return res;
  });
}

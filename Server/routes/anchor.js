const Express = require("express");
const router = Express.Router();
const ObjectId = require("mongodb").ObjectID;
// const mongoose = require("mongoose");
const method = require("../model/DyanamicSchema");
const ResolutionPatternCollection = require("../model/ResolutionPatternCollection");

router.post("/post-anchor", async (req, res) => {
  const c_name = req.body.anchorType;
  const d = c_name;
  const Anchor = await method.data.getAnchorModel(d);
  const data = req.body;
  const anAnchor = new Anchor({
    anchor: req.body.anchor,
  });
  console.log(anAnchor);
  anAnchor
    .save()
    .then((response) => {
      console.log("an anchor saved succesfully");
      res.send({ data: response });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/get-anchor", async (req, res) => {
  const c_name = JSON.parse(req.query.payload);
  const d = c_name.anchorType;
  const Anchor = await method.data.getAnchorModel(d);
  Anchor.find().then((data) => {
    res.send(data);
  });
});

router.delete("/delete", async (req, res) => {
  const data = req.body;
  const c_name = data.anchorType;
  const d = c_name;
  const Anchor = await method.data.getAnchorModel(d);

  var id = ObjectId(data.id);
  if (data) {
    Anchor.findByIdAndDelete({ _id: id }, function (err, response) {
      if (err) {
        console.log(err);
      } else {
        res.send({ msg: "delete successfully" });
      }
    });
  }
});

router.put("/update", async (req, res) => {
  const data = req.body;
  const c_name = data.anchorType;
  const d = c_name;
  const Anchor = await method.data.getAnchorModel(d);

  var id = ObjectId(data.id);
  Anchor.findByIdAndUpdate(id, { anchor: data.data }, { new: true })
    .then((response) => {
      res.json({ data: response });
    })
    .catch((err) => {
      res.status(400).json({ err: "Unable to update the Database" });
    });
});

router.post("/save-pattern", async (req, res) => {
  const userAnchor = await getIds({
    anchor: req.body.userAnchor,
    collection: "useranchor",
  });
  const resolutionPattern = await getIds({
    anchor: req.body.resolutionPattern,
    collection: "resolutionpattern",
  });
  const domainAnchor = await getIds({
    anchor: req.body.domainAnchor,
    collection: "domainanchor",
  });
  const flowAnchor = await getIds({
    anchor: req.body.flowAnchor,
    collection: "flowanchor",
  });

  const entityAnchor = await getIds({
    anchor: req.body.entity_anchor,
    collection: "entity_anchor",
  });
  const pattern = {
    user_anchor: userAnchor._id,
    resolution_pattern: resolutionPattern._id,
    domain_anchor: domainAnchor._id,
    flow_anchor: flowAnchor._id,
    entity_anchor: entityAnchor._id,
  };

  const modelResolutionPattern = new ResolutionPatternCollection(pattern);
  modelResolutionPattern
    .save()
    .then((response) => {
      res.send({ json: "pattern saved successfully" });
    })
    .catch((error) => {
      if (error.name === "MongoError" && error.code === 11000) {
        res.send({ err: "duplicate resolution pattern" });
      } else {
        console.log(error);
        res.send({ err: error });
      }
    });
});

router.get("/get-resolution-pattern", async (req, res) => {
  const anchor = JSON.parse(req.query.payload);
  const userId = await getIds({
    anchor: anchor.user_anchor,
    collection: "useranchor",
  });
  const resoLutionId = await getIds({
    anchor: anchor.resolution,
    collection: "resolutionpattern",
  });

  const user_anchor_id = ObjectId(userId._id).toString();
  const resoLution_id = resoLutionId
    ? ObjectId(resoLutionId._id).toString()
    : null;
  const query = resoLutionId
    ? {
        user_anchor: user_anchor_id,
        resolution_pattern: resoLution_id,
      }
    : {
        user_anchor: user_anchor_id,
      };
  var arr = await ResolutionPatternCollection.find(query);

  for (let i of arr) {
    i.flow_anchor = await getAnchorById({
      anchor: ObjectId(i.flow_anchor),
      collection: "flowanchor",
    });
    i.domain_anchor = await getAnchorById({
      anchor: ObjectId(i.domain_anchor),
      collection: "domainanchor",
    });
    i.resolution_pattern = await getAnchorById({
      anchor: ObjectId(i.resolution_pattern),
      collection: "resolutionpattern",
    });
    i.user_anchor = await getAnchorById({
      anchor: ObjectId(i.user_anchor),
      collection: "useranchor",
    });
    i.entity_anchor = await getAnchorById({
      anchor: ObjectId(i.entity_anchor),
      collection: "entity_anchor",
    });
  }
  res.send(arr);
});

router.get("/get-all-resolution-pattern", async (req, res) => {
  const Rarr = await ResolutionPatternCollection.find({});

  for (let i of Rarr) {
    i.flow_anchor = await getAnchorById({
      anchor: ObjectId(i.flow_anchor),
      collection: "flowanchor",
    });
    i.domain_anchor = await getAnchorById({
      anchor: ObjectId(i.domain_anchor),
      collection: "domainanchor",
    });
    i.resolution_pattern = await getAnchorById({
      anchor: ObjectId(i.resolution_pattern),
      collection: "resolutionpattern",
    });
    i.user_anchor = await getAnchorById({
      anchor: ObjectId(i.user_anchor),
      collection: "useranchor",
    });
    i.entity_anchor = await getAnchorById({
      anchor: ObjectId(i.entity_anchor),
      collection: "entity_anchor",
    });
  }
  res.send(Rarr);
});

module.exports = router;

const getAnchorById = async (data) => {
  const Anchor = await method.data.getAnchorModel(data.collection);
  return Anchor.findById(data.anchor).then((res) => {
    return res.anchor;
  });
};

const getIds = async (data) => {
  const Anchor = await method.data.getAnchorModel(data.collection);
  return Anchor.findOne({ anchor: data.anchor });
};

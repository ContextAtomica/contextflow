import React, { useState, useEffect, useContext } from "react";
import CreatableSelect from "react-select/creatable";
import WordPhraseClientApi from "../../client-api/word-phrase";
import { UserContext } from "../../provider/UserProvider";
import { Row, Form } from "react-bootstrap";
import toastr from "toastr";
import "./Wordphrase.css";

const WordPhrase = ({
  name,
  setModel,
  setDomain,
  setFlow,
  isMulti,
  setAddModulesData,
  heading,
  selectValue,
  setSelectDomain,
  setSelectFlow,
  setSelectmodelEntity,
  // model_entity,
  background,
}) => {
  const user_data = useContext(UserContext);
  const [userData] = user_data.user;
  const user = userData.user !== undefined ? userData.user : userData.user2;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState([]);
  const [Label, setLabel] = useState([]);
  const [edit, setEdit] = useState(false);
  const [dataToBeChange, setDataChange] = useState();
  const [selected, isSelected] = useState(false);
  const [IsDelete, SetDelete] = useState(false);
  const [refresh, setRefresh] = useState(false);

  //getting all data from db
  useEffect(() => {
    (async () => {
      await WordPhraseClientApi.getAllWordPhrase().then((result) => {
        setData(result.data);
      });
    })();
  }, [refresh, loading, setLoading, value]);

  useEffect(() => {
    if (value !== null) {
      setDataChange(value.wp);
    } else {
      setDataChange(null);
    }
  }, [value, setLoading]);
  useEffect(() => {
    if (value) {
      if (setSelectDomain) {
        const obj = { domain: value.wp };
        setSelectDomain(obj);
      }
      if (setSelectFlow) {
        const obj = { flow: value.wp };
        setSelectFlow(obj);
      }
      if (setSelectmodelEntity) {
        const obj = { model_entity: value.wp };

        setSelectmodelEntity(obj);
      }
      if (setDomain) {
        const obj = { domain: value.wp };
        setDomain(obj);
      }
      if (setFlow) {
        const obj = { flow: value.wp };
        console.log(obj);
        setFlow(obj);
      }
      if (setAddModulesData) {
        setAddModulesData(value);
      }
      // if (setModel) {
      //   setModel(datas);
      // }
    }
  }, [
    value,
    setLoading,
    setAddModulesData,
    setDomain,
    setFlow,
    setSelectDomain,
    setSelectFlow,
    setSelectmodelEntity,
  ]);

  useEffect(() => {
    if (selectValue) {
      const selectObj = { wp: selectValue, label: selectValue };
      setValue(selectObj);
      if (setSelectDomain) {
        const setObj = { domain: selectObj.wp };
        setSelectDomain(setObj);
      }
      if (setSelectFlow) {
        const setObj = { flow: selectObj.wp };
        setSelectFlow(setObj);
      }
      if (setSelectmodelEntity) {
        const setObj = { model_entity: selectObj.wp };
        setSelectmodelEntity(setObj);
      }
    }
  }, [selectValue, setSelectDomain, setSelectFlow, setSelectmodelEntity]);

  //hendle onchange for select creatable form and saving the selected data to session storage
  const handleChange = (datas) => {
    var c_data = {};
    var key_name = name;
    isSelected(true);
    if (datas) {
      c_data[key_name] = datas.wp;
    }
    setValue(datas);
    if (setModel) {
      console.log(datas);
      setModel(datas);
    }
  };
  //creating new anchor and saving to the db
  const handleCreate = (datas) => {
    if (user) {
      setLoading(true);
      datas = datas.replace(/\s{2,}/g, " ");
      let d = { wp: datas, owner: user._id };

      WordPhraseClientApi.saveWordPhrase(d).then((res) => {
        var sd = {
          _id: res.data.data._id,
          wp: res.data.data.wp,
          __v: res.data.data.__v,
          owner: res.data.data.owner,
          label: res.data.data.wp,
          value: res.data.data.wp,
        };
        data.push(sd);
        setData(data);
        setLoading(false);
        setValue(sd);
      });
    } else {
      alert("Please log in");
    }
  };

  //handle ooChange function for edit data form
  const handleAnchorChange = (e) => {
    setDataChange(e.target.value);
  };

  //passing an extra attribute named "label" to the array of obects as it needed by creatable components
  useEffect(() => {
    (async () => {
      let wdata = data.map((e) => {
        e.label = e.wp;
        e.value = e.wp;
        return e;
      });
      setLabel(wdata);
    })();
  }, [data]);

  //updating the anchor value in the DB
  const updateAnchor = (e) => {
    e.preventDefault();
    setLoading(true);
    setEdit(false);
    var updateData = dataToBeChange;
    updateData = updateData.replace(/\s{2,}/g, " ");
    const d = {
      id: value._id,
      data: updateData,
      owner: user._id,
    };
    WordPhraseClientApi.updateWordPhraseById(d).then((res) => {
      if (res.data.err) {
        toastr.warning(`${res.data.err}`);
        setLoading(false);
      } else {
        var sd = {
          _id: res.data.data._id,
          wp: res.data.data.wp,
          __v: res.data.data.__v,
          owner: res.data.data.owner,
          label: res.data.data.wp,
        };

        setValue(sd);
        setLoading(false);
      }
    });
  };

  //deleting the anchor from db
  const deleteAnchor = (e) => {
    e.preventDefault();
    setLoading(true);
    SetDelete(false);
    var d = {
      id: value._id,
      owner: user._id,
    };
    WordPhraseClientApi.deleteWordPhraseById(d).then((res) => {
      setValue(null);
      if (res.data.err) {
        toastr.warning(`${res.data.err}`);
      }
      if (res.data.msg) {
        toastr.success(`${res.data.msg}`);
      }
      setLoading(false);
      setEdit(false);
    });
  };
  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      width: "260px",
    }),
  };

  const refreshComp = () => {
    setRefresh(!refresh);
  };
  return (
    <div
      className="select-wrapper-2"
      style={{ background: background ? background : "tomato" }}
    >
      <div>
        <div className="form-wrapper-2">
          <p style={{ color: "white" }}>
            {heading ? (
              <>
                <b> {heading}</b>
              </>
            ) : (
              "word phrase"
            )}
          </p>
          {/* this is the form where we can update the value this will appear when we click on the edit button by setEdit(true) */}
          {edit && value ? (
            <>
              <Form id="edit-form" onSubmit={updateAnchor}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="component"
                    onChange={handleAnchorChange}
                    value={dataToBeChange ? dataToBeChange : ""}
                    placeholder="Edit Anchor"
                  />
                </Form.Group>
                <button
                  className="border-button"
                  style={{ margin: "5px" }}
                  form="edit-form"
                  type="submit"
                >
                  save
                </button>

                <button
                  className="border-button"
                  onClick={() => setEdit(false)}
                >
                  cancel
                </button>
              </Form>
            </>
          ) : null}

          {IsDelete && value ? (
            <>
              {" "}
              <Form id="delete-form" onSubmit={deleteAnchor}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="components"
                    value={dataToBeChange ? dataToBeChange : ""}
                    placeholder="Edit Anchor"
                    disabled
                  />
                </Form.Group>
                <button
                  className="border-button"
                  style={{ margin: "5px" }}
                  form="delete-form"
                  type="submit"
                >
                  confirm delete
                </button>
                <button
                  className="border-button"
                  onClick={() => SetDelete(false)}
                >
                  cancel
                </button>
              </Form>
            </>
          ) : null}
        </div>
        {/* this is the creatable components with some basic inline css */}
        {/* <div className="select-inner-wrapper"> */}
        <Row>
          <div className="creatable-2" onClick={() => refreshComp()}>
            {isMulti ? (
              <CreatableSelect
                maxMenuHeight={200}
                isMulti
                isClearable
                isDisabled={false}
                isLoading={loading}
                onChange={handleChange}
                onCreateOption={handleCreate}
                options={data}
                value={value}
                styles={customStyles}
              />
            ) : (
              <CreatableSelect
                maxMenuHeight={200}
                isClearable
                isDisabled={false}
                isLoading={loading}
                onChange={handleChange}
                onCreateOption={handleCreate}
                options={data}
                value={value}
                styles={customStyles}
              />
            )}
          </div>
          <div className="button-wrapper-2">
            {/* <div> */}
            {isMulti ? null : (
              <>
                {selected && !edit && !IsDelete && value ? (
                  <>
                    <button
                      className="trnsparent-button"
                      style={{ margin: "5px" }}
                      onClick={() => setEdit(true)}
                    >
                      C
                    </button>
                    <button
                      className="trnsparent-button"
                      onClick={() => SetDelete(true)}
                    >
                      D
                    </button>
                  </>
                ) : null}
              </>
            )}
          </div>
        </Row>
        {/* </div> */}
      </div>
    </div>
  );
};
export default WordPhrase;

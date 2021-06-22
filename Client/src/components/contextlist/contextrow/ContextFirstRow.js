import React, { useState } from "react";
import ContextBunch from "./ContextBunch";
import "../context_flow.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getAllContextValue } from "../../../client-api/contextflow";
import ChangeContext from "../ChangeContext";
import ContextValueModal from "../../context-value/ContextValueModal";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import copy from "../../../assets/copy.png";
const ContextFirstRow = ({ context, setRefresh }) => {
  const [change, setChange] = useState(false);
  const [changeData, setChangeData] = useState();
  var contxts = [context];
  const [addModule, setAddModule] = useState(false);
  const [contxtType, setContxtType] = useState(false);
  const [contextAllvalue, setcontextAllvalue] = useState([]);
  const [showContextValueModal, setShowContextValueModal] = useState(false);
  const [attention, setAttention] = useState();
  const [atn, setAtn] = useState();
  const [contexts, setContexts] = useState();
  const [copy, setCopy] = useState(false);
  const add_module = async (context) => {
    var count = 0;
    for (var key in context) {
      if (key.includes("atn")) {
        count = count + 1;
      }
    }
    setAtn(count);
    setAddModule(true);
    setContexts(context);
  };

  const contextValuePopUp = async (attention) => {
    await getAllContextValue({ id: context._id }).then((res) => {
      setcontextAllvalue(res.data);
    });
    // setAtn(attention);
    setShowContextValueModal(true);
  };
  return (
    <div>
      <ContextValueModal
        showContextValueModal={showContextValueModal}
        setShowContextValueModal={setShowContextValueModal}
        contextAllvalue={contextAllvalue}
        context={context}
        contxts={context.atttentionentities}
      />

      <Container fluid>
        {contxts.map((contxt, i) => (
          <Row className="anchored-first-row" key={i}>
            <Col xs={3}>
              <li className="d-f-container">{contxt.domain}</li>
            </Col>
            <Col xs={3}>
              <li className="d-f-container">{contxt.flow}</li>
            </Col>
            <Col xs={6}>
              <div className="type-holder">
                <>
                  <div className="type">
                    {<p className="typedata"> {contxt.contexttype}</p>}
                  </div>
                  <div className="button-container">
                    <CopyToClipboard
                      className="square_btn"
                      text={context._id}
                      onCopy={() => setCopy(true)}
                    >
                      <button
                        title="copy context"
                        // style={{
                        //   cursor: "pointer",
                        //   border: "none",
                        //   // background: "transparent",
                        //   height: "auto",
                        //   width: "auto",
                        //   fontSize: "1em",
                        //   marginRight: "5px",
                        // }}
                      >
                        C
                      </button>
                    </CopyToClipboard>
                    <button
                      className="square_btn"
                      onClick={() => contextValuePopUp(attention)}
                    >
                      f
                    </button>
                    <button
                      className="square_btn"
                      onClick={() => {
                        add_module(contxt);
                      }}
                      // className="change-button"
                    >
                      +
                    </button>
                  </div>
                </>
              </div>
            </Col>
          </Row>
        ))}
        <div>
          <ContextBunch
            setContxtType={setContxtType}
            context={context}
            addModule={addModule}
            atn={atn}
            setAddModule={setAddModule}
            contexts={contexts}
            setRefresh={setRefresh}
            setChange={setChange}
            change={change}
            setChangeData={setChangeData}
          />
        </div>
        <div>
          {change ? (
            <ChangeContext
              setContxtType={setContxtType}
              setRefresh={setRefresh}
              context={context}
              changeData={changeData}
              setChange={setChange}
            />
          ) : null}
        </div>
      </Container>
    </div>
  );
};
export default ContextFirstRow;

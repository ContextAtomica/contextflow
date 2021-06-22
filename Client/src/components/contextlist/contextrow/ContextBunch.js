import React, { useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../context_flow.css";
import ContextEntry from "./ContextEntry";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  updateContextFlowByDrag,
  removeAttentionEntities,
} from "../../../client-api/contextflow";
import { UserContext } from "../../../provider/UserProvider";
import DeleteContext from "../DeleteContext";
import PopUpForm from "../PopUpForm";
import {
  getContextValue,
  // getAllContextValue,
} from "../../../client-api/contextflow";

// import ContextValueModal from "../../context-value/ContextValueModal";
const ContextBunch = ({
  context,
  addModule,
  setAddModule,
  contexts,
  setRefresh,
  setContxtType,
  setChange,
  setChangeData,
}) => {
  const value = useContext(UserContext);
  const [userData] = value.user;
  const user = userData.user !== undefined ? userData.user : userData.user2;
  const [drag, setDrag] = useState(false);
  const [deleteContxt, setDelete] = useState(false);
  const [attention, setAttention] = useState();
  const [show, setShow] = useState(false);
  // const [showContextValueModal, setShowContextValueModal] = useState(false);
  const [context_value, setContextValue] = useState();
  const [contextValueDataFromServer, setContextValueData] = useState([]);
  // const [contextAllvalue, setcontextAllvalue] = useState([]);
  // const [atn, setAtn] = useState();
  var contxts = context.atttentionentities;
  const saveDragValue = () => {
    if (user._id === context.owner) {
      var draggedArray = {
        drag: contxts,
        user: user._id,
        contextId: context._id,
      };
      updateContextFlowByDrag(draggedArray)
        .then((res) => {
          setDrag(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("only owner can update");
    }
  };

  const removeEntity = () => {
    if (user._id === context.owner) {
      var entityRemove = {
        atttentionentity: attention,
        user: user._id,
        contextId: context._id,
      };
      removeAttentionEntities(entityRemove).then((res) => {
        setRefresh(res);
        setDelete(false);
      });
    } else {
      alert("only owner can make change");
    }
  };
  const contextChange = (attention) => {
    setChange(true);
    setContxtType(true);
    var obj = {
      model_entity: attention,
      flow: context.flow,
      domain: context.domain,
      contexttype: context.contexttype,
    };
    setChangeData(obj);
  };
  const deleteContextById = (atn) => {
    setDelete(true);
    setAttention(atn);
  };
  const contextValue = async (attention) => {
    setContextValue(attention);
    await getContextValue({ wp: attention, id: context._id }).then((res) => {
      setContextValueData(res.data);
    });
    setShow(true);
  };

  return (
    <div>
      <PopUpForm
        contextId={context._id}
        showForm={show}
        setShowForm={setShow}
        contextValue={context_value}
        valueData={contextValueDataFromServer}
      />

      <Container fluid>
        <DragDropContext
          onDragEnd={(param) => {
            setDrag(true);
            const srcI = param.source.index;
            const desI = param.destination?.index;
            if (desI) {
              contxts.splice(desI, 0, contxts.splice(srcI, 1)[0]);
            }
          }}
        >
          <Droppable droppableId="droppable-1">
            {(provided, _) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {contxts.map((attention, i) => (
                  <Row key={i}>
                    <Col xs={2}> {"  "}</Col>
                    <Col xs={3}>{"  "}</Col>
                    <Col xs={7}>
                      <Draggable
                        key={i}
                        draggableId={"draggable-" + i}
                        index={i}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={{
                              ...provided.draggableProps.style,
                              boxShadow: snapshot.isDragging
                                ? "0 0 .4rem #666"
                                : "none",
                            }}
                          >
                            <div className="wp-holder">
                              <li
                                className="atn-content"
                                {...provided.dragHandleProps}
                              >
                                {attention}
                              </li>{" "}
                              <div className="button-container">
                                <button
                                  className="button-bunch"
                                  onClick={() => {
                                    contextValue(attention);
                                  }}
                                >
                                  v
                                </button>
                                <button
                                  onClick={() => contextChange(attention)}
                                  variant="success"
                                  className="button-bunch"
                                >
                                  C
                                </button>
                                <button
                                  className="button-bunch"
                                  onClick={() => deleteContextById(attention)}
                                  variant="danger"
                                >
                                  D
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    </Col>
                  </Row>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {deleteContxt ? (
          <DeleteContext
            attention={attention}
            setDelete={setDelete}
            variant="success"
            removeEntity={removeEntity}
          />
        ) : null}
        {drag ? (
          <Button
            onClick={() => saveDragValue()}
            variant="success"
            style={{ marginLeft: "37.7%" }}
          >
            save
          </Button>
        ) : null}

        {addModule ? (
          <>
            <ContextEntry
              contextData={contexts}
              setAddModule={setAddModule}
              setRefresh={setRefresh}
            />
          </>
        ) : null}
      </Container>
    </div>
  );
};
export default ContextBunch;

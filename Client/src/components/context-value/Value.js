import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const Value = ({
  post,
  contextvalueadress,
  getUpdatedValue,
  wp,
  seturrentWp,
}) => {
  const [postValue, setPostValue] = useState([]);
  const [drag, setDrag] = useState(false);
  useEffect(() => {
    setPostValue(post);
    seturrentWp(wp);
  }, [post]);
  return (
    <div>
      <DragDropContext
        onDragEnd={(param) => {
          setDrag(true);
          const srcI = param.source.index;
          const desI = param.destination?.index;
          if (desI) {
            postValue.splice(desI, 0, postValue.splice(srcI, 1)[0]);
            postValue[srcI].position = srcI + 1;
            postValue[desI].position = desI + 1;
          }
          getUpdatedValue({ value: postValue, adress: contextvalueadress });
        }}
      >
        <Droppable droppableId="droppable-1">
          {(provided, _) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {postValue.map((value, i) => (
                <ul key={i}>
                  <Draggable key={i} draggableId={"draggable-" + i} index={i}>
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
                        <div
                          style={{ listStyle: "none" }}
                          className="content-div"
                          {...provided.dragHandleProps}
                        >
                          <li>
                            {value.type === "button" ? (
                              <>
                                {" "}
                                <label>{value.type}</label>:
                                <button
                                  onClick={() => console.log("button clicked")}
                                  style={{
                                    height: `${value.height}px`,
                                    width: `${value.width}px`,
                                  }}
                                >
                                  {value.cValue}
                                </button>
                                {value.image !== undefined && (
                                  <img src={value.image} />
                                )}
                              </>
                            ) : null}
                          </li>
                          <li>
                            {value.type === "text" ? (
                              <>
                                <label>{value.type}</label>: <input />{" "}
                                {value.image !== undefined && (
                                  <img src={value.image} />
                                )}
                              </>
                            ) : null}
                          </li>
                          <li>
                            {value.type === "label" ? (
                              <>
                                <label>{value.type}</label>:
                                <label
                                  style={{
                                    borderStyle: "ridge",
                                    height: `${value.height}px`,
                                    width: `${value.width}px`,
                                  }}
                                >
                                  {value.cValue}
                                </label>
                                {value.image !== undefined && (
                                  <img src={value.image} />
                                )}
                              </>
                            ) : null}
                          </li>
                          <li>
                            {value.type === "invalid" ? (
                              <>
                                <label>{value.type}</label>:
                                <label
                                  style={{
                                    height: "10px",
                                    width: "200px",
                                  }}
                                >
                                  {value.cValue}
                                </label>
                                {value.image !== undefined && (
                                  <img src={value.image} />
                                )}
                              </>
                            ) : null}
                          </li>
                        </div>
                      </div>
                    )}
                  </Draggable>
                </ul>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default Value;

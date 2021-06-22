import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import "./ContextValue.css";
import { Row, Col, Card } from "react-bootstrap";
// import Flippy, { FrontSide, BackSide } from "react-flippy";
import ReactCardFlip from "react-card-flip";
import Value from "./Value";
import rotate from "../../assets/rotate.png";

function ContextValueList({
  contextAllvalue,
  context,
  contxts,
  getUpdatedValue,
  setShowButton,
  setEntityImage,
  seturrentWp,
}) {
  const [contextValue, setContextValue] = useState([]);
  const [showPerPage, setShowPerPage] = useState(1);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  useEffect(() => {
    setContextValue(contextAllvalue);
  }, [contextAllvalue]);

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };
  const [flipped, isFlipped] = useState(false);
  const handleClick = (e) => {
    isFlipped(!flipped);
  };

  return (
    <div>
      <div className="container py-4">
        <Row>
          <Col>
            {contextValue.length > 0
              ? contextValue
                  .slice(pagination.start, pagination.end)
                  .map((post, i) => (
                    <Col xs={12} key={i}>
                      <ReactCardFlip isFlipped={flipped}>
                        <Card border="primary" className="modal-card">
                          <Card.Header>{post.wp}</Card.Header>
                          <Card.Body>
                            <Value
                              wp={post.wp}
                              post={post.value}
                              contextvalueadress={post.va}
                              posts={post}
                              getUpdatedValue={getUpdatedValue}
                              seturrentWp={seturrentWp}
                            />
                          </Card.Body>
                          <Card.Footer>
                            <button
                              className="trnsparent-button"
                              onClick={() => handleClick()}
                            >
                              <img style={{ width: "30px" }} src={rotate} />
                            </button>
                          </Card.Footer>
                        </Card>

                        <Card className="modal-card">
                          <Card.Body>
                            Flow: {context.flow}
                            <br />
                            Domain:{context.domain}
                            <br />
                            UserAnchor:{context.UserAnchor}
                            <br />
                            FlowAnchor: {context.FlowAnchor}
                          </Card.Body>
                          <Card.Footer>
                            <button
                              className="trnsparent-button"
                              onClick={() => handleClick()}
                            >
                              <img style={{ width: "30px" }} src={rotate} />
                            </button>
                          </Card.Footer>
                        </Card>
                      </ReactCardFlip>
                    </Col>
                  ))
              : contxts
                  .slice(pagination.start, pagination.end)
                  .map((post, i) => (
                    <Col xs={12} key={i}>
                      <p>{post}</p>
                      <ReactCardFlip isFlipped={flipped}>
                        <Card className="modal-card">
                          <Card.Body></Card.Body>
                          <Card.Footer>
                            <button
                              className="trnsparent-button"
                              onClick={() => handleClick()}
                            >
                              <img style={{ width: "30px" }} src={rotate} />
                            </button>
                          </Card.Footer>
                        </Card>

                        <Card className="modal-card">
                          <Card.Body>
                            Flow: {context.flow}
                            <br />
                            Domain:{context.domain}
                            <br />
                            UserAnchor:{context.UserAnchor}
                            <br />
                            FlowAnchor: {context.FlowAnchor}
                          </Card.Body>
                          <Card.Footer>
                            <button
                              className="trnsparent-button"
                              onClick={() => handleClick()}
                            >
                              <img style={{ width: "30px" }} src={rotate} />
                            </button>
                          </Card.Footer>
                        </Card>
                      </ReactCardFlip>
                    </Col>
                  ))}
          </Col>
          <Col xs={12}>
            <Pagination
              showPerPage={showPerPage}
              setShowButton={setShowButton}
              setEntityImage={setEntityImage}
              onPaginationChange={onPaginationChange}
              total={
                contextAllvalue.length !== 0
                  ? contextAllvalue.length
                  : contxts.length
              }
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ContextValueList;

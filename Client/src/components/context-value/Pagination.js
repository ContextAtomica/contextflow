import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import "./ContextValue.css";
import UploadImage from "./UploadImage.js";

const Pagination = ({
  showPerPage,
  onPaginationChange,
  total,
  setShowButton,
  setEntityImage,
}) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  const onButtonClick = (type) => {
    setShowButton(false);
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (Math.ceil(total / showPerPage) === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <Row className="button-holder">
      <button className="prev-button" onClick={() => onButtonClick("prev")}>
        Prev
      </button>
      <div style={{ marginTop: "10px" }}>
        <UploadImage setEntityImage={setEntityImage} />
      </div>
      <button className="next-button" onClick={() => onButtonClick("next")}>
        Next
      </button>
    </Row>
  );
};

export default Pagination;

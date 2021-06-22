import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ContextValueList from "./ContextValueList";
import {
  updateContextValue,
  saveContextValueImg,
} from "../../client-api/contextflow";

const ContextValueModal = ({
  showContextValueModal,
  setShowContextValueModal,
  contextAllvalue,
  context,
  atn,
  contxts,
}) => {
  const handleClose = () => setShowContextValueModal(false);
  const [show, setShow] = useState(false);
  const [draggedValue, setDraggedValue] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [entityImage, setEntityImage] = useState(false);
  const [currentWp, seturrentWp] = useState();

  useEffect(() => {
    setShow(showContextValueModal);
  }, [showContextValueModal]);

  const getUpdatedValue = (value) => {
    setDraggedValue(value);
    setShowButton(value);
  };
  const saveUpdatedValue = () => {
    if (draggedValue) {
      updateContextValue(draggedValue).then((res) => {
        console.log(res);
      });
    } else if (entityImage) {
      saveContextValueImg({
        id: context._id,
        wp: currentWp,
        entityImage: entityImage,
      }).then((res) => {
        setEntityImage(false);
      });
    }
    setShowButton(false);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ height: "5px" }}></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContextValueList
            contextAllvalue={contextAllvalue}
            context={context}
            // atn={atn}
            setEntityImage={setEntityImage}
            contxts={contxts}
            getUpdatedValue={getUpdatedValue}
            setShowButton={setShowButton}
            seturrentWp={seturrentWp}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {showButton || entityImage ? (
            <Button variant="primary" onClick={() => saveUpdatedValue()}>
              Save Changes
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ContextValueModal;

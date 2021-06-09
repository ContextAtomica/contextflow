import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ContextValueList from "./ContextValueList";
import { updateContextValue } from "../../client-api/contextflow";

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
  const [draggedValue, setDraggedValue] = useState();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setShow(showContextValueModal);
  }, [showContextValueModal]);

  const getUpdatedValue = (value) => {
    setDraggedValue(value);
    setShowButton(value);
  };
  const saveUpdatedValue = () => {
    updateContextValue(draggedValue).then((res) => {
      console.log(res);
    });
    setShowButton(false);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title></Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <ContextValueList
            contextAllvalue={contextAllvalue}
            context={context}
            atn={atn}
            contxts={contxts}
            getUpdatedValue={getUpdatedValue}
            setShowButton={setShowButton}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {showButton ? (
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

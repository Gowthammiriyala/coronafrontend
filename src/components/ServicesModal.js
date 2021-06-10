import { Button, ListGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateRefServices } from "../redux/ServicesReducer";

export function ServicesModal() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const updateRefObj = () => {
    dispatch(updateRefServices({}));
  };

  return (
    <Modal show={state.services.refemp.serviceId} onHide={() => updateRefObj()}>
      <Modal.Header closeButton>
        <Modal.Title>For Id, {state.services.refemp.serviceId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>
            Ipd Service - {state.patient.refemp.ipd}
          </ListGroup.Item>
          <ListGroup.Item>
            Opd Service - {state.patient.refemp.opd}
          </ListGroup.Item>
          <ListGroup.Item>
            Additional Services- {state.patient.refemp.additionalServices}
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => updateRefObj()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

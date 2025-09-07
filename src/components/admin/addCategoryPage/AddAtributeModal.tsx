import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

interface AddAttributeModalProps {
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
}

function AddAttributeModal({ show, handleClose }: AddAttributeModalProps) {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="AddAttributeModalForm.ControlInput1"
            >
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhâp tên thuộc tính"
                autoFocus
              />
              <br />
              <Form.Label>Đơn vị tính</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhâp đơn vị tính"
                autoFocus
              />
              <br />
              <Form.Label>Kiểu dữ liệu</Form.Label>
              <Form.Select aria-label="Default select example" className="mt-3">
                <option>Chọn kiểu dữ liệu</option>
                <option value="int">Số nguyên</option>
                <option value="decimal">Số thập phân</option>
                <option value="nvarchar">Ký tự chữ cái</option>
              </Form.Select>
            </Form.Group>
            {/* <Form.Group
              className="mb-3"
              controlId="AddAttributeModalForm.ControlTextarea1"
            >
              <Form.Label>AddAttributeModal textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddAttributeModal;

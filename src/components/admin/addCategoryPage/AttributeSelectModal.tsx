import { useQuery } from "@tanstack/react-query";
import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";
import attributeQuery from "../../../module/admin/query/attribute";

interface AttributeSelectModalProps {
  id: number;
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
}

function AttributeSelectModal({
  id,
  show,
  handleClose,
}: AttributeSelectModalProps) {
  const { data: attributes } = useQuery(attributeQuery.list);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading {id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            <table className="table table-bordered mt-4">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên Thuộc Tính</th>
                  <th>Mô Tả</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody style={{ overflowY: "auto", maxHeight: "60px" }}>
                {attributes?.map((attr) => (
                  <tr key={attr.id}>
                    <td>{attr.id}</td>
                    <td>{attr.name}</td>
                    <td>{attr.slug || "N/A"}</td>
                    <td>
                      <input type="checkbox" className="me-2" />

                      {/* <button className="btn btn-sm btn-danger">Xóa</button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

export default AttributeSelectModal;

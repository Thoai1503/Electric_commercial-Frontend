import { useQuery } from "@tanstack/react-query";
import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";
import attributeQuery from "../../../module/admin/query/attribute";
import { CSpinner } from "@coreui/react";
import { useAttributeSelectModal } from "../../../module/admin/hook/category_page/useAttributeSelectModal";

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
  const { setSelectedList, handleChange, handleSubmit, isPendingCreate } =
    useAttributeSelectModal(id, handleClose);
  const { data: attributes, isPending } = useQuery(
    attributeQuery.selectedByCategoryId(id)
  );

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          handleClose();
          setSelectedList([]);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading {id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isPending ? (
            <CSpinner color="primary" />
          ) : (
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
                        {attr.is_selected ? (
                          <input
                            type="checkbox"
                            checked
                            readOnly
                            className="me-2"
                          />
                        ) : (
                          <input
                            type="checkbox"
                            className="me-2"
                            onChange={(event) => {
                              handleChange(event, attr.id);
                            }}
                          />
                        )}
                        {/* <button className="btn btn-sm btn-danger">Xóa</button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={isPendingCreate}
            onClick={handleSubmit}
          >
            {isPendingCreate ? "..Đang lưu" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AttributeSelectModal;

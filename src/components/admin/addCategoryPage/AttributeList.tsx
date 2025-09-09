import { useState } from "react";
import type { Attribute } from "../../../type/Attribute";
import AddAttributeModal from "./AddAtributeModal";


interface AttributeListProps {
  attributes: Attribute[];
}

const AttributeList = ({ attributes }: AttributeListProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <h4 className="text-start">Danh sách thuộc tính cho danh mục</h4>

      <button
        className="btn btn-sm btn-success mb-3 text-end"
        style={{ display: "inline", color: "white" }}
        onClick={handleShow}
      >
        Thêm thuộc tính mới
      </button>
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Thuộc Tính</th>
            <th>Mô Tả</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {attributes.map((attr) => (
            <tr key={attr.id}>
              <td>{attr.id}</td>
              <td>{attr.name}</td>
              <td>{attr.slug || "N/A"}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2">Sửa</button>
                <button className="btn btn-sm btn-danger">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddAttributeModal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
      />
    </div>
  );
};

export default AttributeList;

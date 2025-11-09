import { useState } from "react";
import { CBadge, CButton, CCollapse, CSmartTable } from "@coreui/react-pro";
import type { NodeModel } from "@minoru/react-dnd-treeview";

import AttributeSelectModal from "./AttributeSelectModal";
import { useQuery } from "@tanstack/react-query";
import categoryAttributeQuery from "../../../module/admin/query/categoryAttribute";
import type { CategoryAttribute } from "../../../type/CategoryAttribute";

import { useCategoryAttributeMutation } from "../../../module/admin/hook/category_page/useCategoryAttributeMutation";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
// import { cilPencil, cilTrash } from "@coreui/icons";
// import CIcon from "@coreui/icons-react";

interface Category {
  id: number;
  name: string;
  parent_id: number;

  status: "Active" | "Inactive" | "Pending" | "Archived";
}

const getBadge = (status: string) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Archived":
      return "dark";
    default:
      return "primary";
  }
};

interface CategoryListProps {
  category: NodeModel[];
  attribute: any;
}

export const CategoryList = ({ category }: CategoryListProps) => {
  const [details, setDetails] = useState<number[]>([]);
  //const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { data: categoryAttribute } = useQuery(categoryAttributeQuery.list);
  const {
    handleChangeMutation,
    id,
    show,
    handleClose,
    handleShow,
    deleteCategoryAttribute,
    isPendingDelete,
  } = useCategoryAttributeMutation(
    categoryAttribute ?? ([] as CategoryAttribute[])
  );

  const toggleDetails = (id: number) => {
    const position = details.indexOf(id);
    let newDetails = [...details];
    if (position === -1) {
      newDetails.push(id);
    } else {
      newDetails.splice(position, 1);
    }
    setDetails(newDetails);
  };

  const columns = [
    { key: "text", label: "Category Name", _style: { width: "20%" } },
    {
      key: "parent",
      label: "Parent ID",
      sorter: (a: Category, b: Category) =>
        (a.parent_id || 0) - (b.parent_id || 0),
      _style: { width: "10%" },
    },
    { key: "status", _style: { width: "10%" }, label: "Status" },
    {
      key: "show_details",
      label: "",
      _style: { width: "10%" },
      filter: false,
      sorter: false,
    },
  ];

  return (
    <>
      <CSmartTable
        style={{ marginTop: "20px" }}
        columns={columns}
        activePage={1}
        items={category}
        cleaner
        columnFilter
        columnSorter
        itemsPerPageSelect
        onFilteredItemsChange={(items) => {
          console.log("onFilteredItemsChange");
          console.table(items);
        }}
        onSelectedItemsChange={(items) => {
          console.log("onSelectedItemsChange");
          console.table(items);
        }}
        pagination
        itemsPerPage={5}
        tableProps={{
          hover: true,
          responsive: true,
        }}
        scopedColumns={{
          status: (item: Category) => (
            <td>
              <CBadge color={getBadge(item.status)}>Active</CBadge>
            </td>
          ),

          show_details: (item: Category) => (
            <td>
              <CButton
                style={{ marginRight: "5px", marginLeft: "5px" }}
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() => toggleDetails(item.id)}
              >
                {" "}
                {details.includes(item.id) ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </CButton>
              {/* <CButton color="info" variant="outline" size="sm" className="m-2">
                Chọn thuộc tính
              </CButton> */}
              <button
                className="btn btn-sm btn-info "
                onClick={() => handleShow(item.id)}
              >
                Chọn
              </button>
            </td>
          ),
          details: (item: any) => (
            <>
              <CCollapse visible={details.includes(item.id)}>
                <div className="p-3" style={{ backgroundColor: "#eeeeeeff  " }}>
                  <h5 className="text-primary">{item.text}</h5>
                  <p className="text-primary">
                    Cấu hình thuộc tính cho danh mục
                  </p>
                  <hr />
                  <h6>Thuộc tính</h6>

                  <table className="table table-bordered mt-4 ">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Tên Thuộc Tính</th>
                        <th>Slug</th>
                        <th>Lọc (bặt/tắt)</th>
                        <th>Cấp biến thể (có/ko)</th>
                        <th>Bắt buộc</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(categoryAttribute)
                        ? categoryAttribute
                            .filter(
                              (attr: CategoryAttribute) =>
                                attr.category_id === item.id
                            )
                            .map((attr: CategoryAttribute) => (
                              <tr key={attr.id}>
                                <td>{attr.id}</td>
                                <td>{attr.attribute?.name}</td>
                                <td>{attr.attribute?.slug || "N/A"}</td>
                                <td>
                                  {attr.is_filterable ? (
                                    <input
                                      type="checkbox"
                                      id={`filterable-${attr.id}`}
                                      name="is_filterable"
                                      defaultChecked={true}
                                      onChange={(e) =>
                                        handleChangeMutation(e, attr.id)
                                      }
                                    />
                                  ) : (
                                    <input
                                      type="checkbox"
                                      id={`filterable-${attr.id}`}
                                      name="is_filterable"
                                      defaultChecked={false}
                                      onChange={(e) =>
                                        handleChangeMutation(e, attr.id)
                                      }
                                    />
                                  )}
                                </td>
                                <td>
                                  {attr.is_variant_level ? (
                                    <input
                                      type="checkbox"
                                      id={`variant-level-${attr.id}`}
                                      name="is_variant_level"
                                      defaultChecked={true}
                                      onChange={(e) =>
                                        handleChangeMutation(e, attr.id)
                                      }
                                    />
                                  ) : (
                                    <input
                                      type="checkbox"
                                      id={`variant-level-${attr.id}`}
                                      name="is_variant_level"
                                      defaultChecked={false}
                                      onChange={(e) =>
                                        handleChangeMutation(e, attr.id)
                                      }
                                    />
                                  )}
                                </td>
                                <td>
                                  {attr.is_required ? (
                                    <input
                                      type="checkbox"
                                      id={`required-${attr.id}`}
                                      name="is_required"
                                      defaultChecked={true}
                                      onChange={(e) =>
                                        handleChangeMutation(e, attr.id)
                                      }
                                    />
                                  ) : (
                                    <input
                                      type="checkbox"
                                      id={`required-${attr.id}`}
                                      name="is_required"
                                      defaultChecked={false}
                                      onChange={(e) =>
                                        handleChangeMutation(e, attr.id)
                                      }
                                    />
                                  )}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-sm btn-danger"
                                    style={{ color: "white" }}
                                    onClick={() =>
                                      deleteCategoryAttribute(attr.id)
                                    }
                                    disabled={isPendingDelete}
                                  >
                                    {isPendingDelete ? "..Đang xoá" : "Xoá"}
                                  </button>
                                </td>
                              </tr>
                            ))
                        : null}
                    </tbody>
                  </table>
                </div>
              </CCollapse>
            </>
          ),
        }}
        sorterValue={{ column: "status", state: "asc" }}
        tableFilter
        tableBodyProps={{
          className: "align-middle",
        }}
      />

      {/* Bulk Actions */}
      {/* {selectedItems.length > 0 && (
        <div className="card-footer bg-light border-top">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted">
              Đã chọn {selectedItems.length} danh mục
            </span>
            <div className="d-flex gap-2">
              <CButton color="warning" variant="outline" size="sm">
                <CIcon icon={cilPencil} className="me-1" />
                Chỉnh sửa hàng loạt
              </CButton>
              <CButton color="danger" variant="outline" size="sm">
                <CIcon icon={cilTrash} className="me-1" />
                Xóa đã chọn
              </CButton>
            </div>
          </div>
        </div>
      )} */}

      <AttributeSelectModal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        id={id}
      />
    </>
  );
};

import { useState, useEffect } from "react";
import {
  CBadge,
  CButton,
  CCollapse,
  CSmartTable,
  CFormCheck,
} from "@coreui/react-pro";
import type { NodeModel } from "@minoru/react-dnd-treeview";

import AttributeSelectModal from "./AttributeSelectModal";
import { useQuery } from "@tanstack/react-query";
import categoryAttributeQuery from "../../../module/admin/query/categoryAttribute";
import type { CategoryAttribute } from "../../../type/CategoryAttribute";

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
  const [categories, setCategories] = useState<NodeModel[]>([]);
  //const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const { data: categoryAttribute } = useQuery(categoryAttributeQuery.list);
  const handleClose = () => setShow(false);
  const handleShow = (id = 0) => {
    setShow(true);
    setId(id);
  };

  useEffect(() => {
    // const mappedCategories = category.map((cat) => ({
    //   id: cat.id as number,
    //   name: cat.text,
    //   parent_id: (cat.parent as number) || 0,
    //   status: "Active" as Category["status"], // Default status, adjust as needed
    // }));
    console.log(categories);
    setCategories(category);
  }, [category]);

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
  console.log("categoryAttribute", JSON.stringify(categoryAttribute));

  return (
    <>
      <CSmartTable
        style={{ marginTop: "20px" }}
        columns={columns}
        activePage={2}
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
                color="primary"
                variant="outline"
                size="sm"
                onClick={() => toggleDetails(item.id)}
              >
                {details.includes(item.id) ? "Hide" : "Chọn "}
              </CButton>
              {/* <CButton color="info" variant="outline" size="sm" className="m-2">
                Chọn thuộc tính
              </CButton> */}
              <button
                className="btn btn-sm btn-info "
                onClick={() => handleShow(item.id)}
              >
                Chọn thuộc tính
              </button>
            </td>
          ),
          details: (item: any) => (
            <>
              <CCollapse visible={details.includes(item.id)}>
                <div className="p-3">
                  <h5 className="text-primary">{item.text}</h5>
                  <p>Chọn thuộc tính cho danh mục</p>
                  <hr />
                  <h6>Thuộc tính</h6>
                  <div className="row">
                    {Array.isArray(categoryAttribute)
                      ? categoryAttribute
                          .filter(
                            (attr: CategoryAttribute) =>
                              attr.category_id === item.id
                          )
                          .map((attr: CategoryAttribute) => (
                            <div
                              className="col-md-3 d-flex align-items-center mb-2"
                              key={attr.id}
                            >
                              <CFormCheck
                                type="checkbox"
                                id={`attr-${attr.id}`}
                                label={attr.attribute.name}
                                defaultChecked={true}
                              />
                            </div>
                          ))
                      : null}
                    <div></div>
                  </div>
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
      <AttributeSelectModal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        id={id}
      />
    </>
  );
};

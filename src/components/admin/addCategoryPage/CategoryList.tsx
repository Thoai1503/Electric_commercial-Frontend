import { useState, useEffect } from "react";
import {
  CBadge,
  CButton,
  CCollapse,
  CSmartTable,
  CFormCheck,
} from "@coreui/react-pro";
import type { NodeModel } from "@minoru/react-dnd-treeview";

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
}

export const CategoryList = ({ category }: CategoryListProps) => {
  const [details, setDetails] = useState<number[]>([]);
  const [categories, setCategories] = useState<NodeModel[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    // const mappedCategories = category.map((cat) => ({
    //   id: cat.id as number,
    //   name: cat.text,
    //   parent_id: (cat.parent as number) || 0,
    //   status: "Active" as Category["status"], // Default status, adjust as needed
    // }));
    setCategories(category);
  }, [category]);
  console.log("Category prop:" + JSON.stringify(category));
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
    { key: "text", label: "Category Name", _style: { width: "25%" } },
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
      _style: { width: "1%" },
      filter: false,
      sorter: false,
    },
  ];

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
              <CBadge color={getBadge("Active")}>Active</CBadge>
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
            </td>
          ),
          details: (item: any) => (
            <>
              <CCollapse visible={details.includes(item.id)}>
                <div className="p-3">
                  <CFormCheck
                    id="flexCheckDefault"
                    label="Default checkbox"
                    onChange={() => console.log("Change:" + item.id)}
                  />
                  <CFormCheck id="flexCheckDefault" label="Default checkbox" />
                  <CFormCheck id="flexCheckDefault" label="Default checkbox" />
                  <CFormCheck id="flexCheckDefault" label="Default checkbox" />
                  {/* <h5>{item.text}</h5>
                  <p>{item.description}</p>
                  <p>Created at: {new Date(item.createdAt).toDateString()}</p>
                  <CButton size="sm" color="info">
                    Edit
                  </CButton>
                  <CButton size="sm" color="danger" className="ms-2">
                    Delete
                  </CButton>
                </div>
                <div className="p-3">
                  <h5>{item.name}</h5>
                  <p>{item.description}</p>
                  <p>Created at: {new Date(item.createdAt).toDateString()}</p>
                  <CButton size="sm" color="info">
                    Edit
                  </CButton>
                  <CButton size="sm" color="danger" className="ms-2">
                    Delete
                  </CButton> */}
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

      <div className="mt-3">
        <strong>Selected IDs:</strong> {JSON.stringify(selectedIds)}
      </div>
    </>
  );
};

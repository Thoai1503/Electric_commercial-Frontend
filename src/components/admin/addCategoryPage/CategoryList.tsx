import { useState, useEffect } from "react";
import {
  CBadge,
  CButton,
  CCollapse,
  CSmartTable,
  CFormCheck,
} from "@coreui/react-pro";

interface Category {
  id: number;
  name: string;
  parent_id: number;
  description: string;
  createdAt: string;
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

export const CategoryList = () => {
  const [details, setDetails] = useState<number[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    // Simulate API call
    const data: Category[] = [
      {
        id: 1,
        name: "Electronics",
        parent_id: 0,
        description: "Devices, gadgets, and accessories",
        createdAt: "2024-08-01",
        status: "Active",
      },
      {
        id: 2,
        name: "Furniture",
        parent_id: 0,
        description: "Home and office furniture",
        createdAt: "2023-06-15",
        status: "Inactive",
      },
      {
        id: 3,
        name: "Books",
        parent_id: 0,
        description: "Educational and entertainment books",
        createdAt: "2022-12-10",
        status: "Pending",
      },
    ];
    setCategories(data);
  }, []);

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

  const handleSelect = (id: number) => {
    let newSelected = [...selectedIds];
    if (newSelected.includes(id)) {
      newSelected = newSelected.filter((x) => x !== id);
    } else {
      newSelected.push(id);
    }
    setSelectedIds(newSelected);
  };

  const columns = [
    {
      key: "select",
      label: "Select",
      _style: { width: "1%" },
      filter: false,
      sorter: false,
    },
    { key: "name", label: "Category Name", _style: { width: "25%" } },
    { key: "description", label: "Description" },

    {
      key: "parent_id",
      label: "Parent ID",
      sorter: (a: Category, b: Category) =>
        (a.parent_id || 0) - (b.parent_id || 0),
      _style: { width: "10%" },
    },
    {
      key: "createdAt",
      label: "Created At",
      sorter: (a: Category, b: Category) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    { key: "status", label: "Status" },
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
        items={categories}
        columnFilter
        columnSorter
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
          select: (item: Category) => (
            <td>
              <CFormCheck
                checked={selectedIds.includes(item.id)}
                onChange={() => handleSelect(item.id)}
              />
            </td>
          ),

          status: (item: Category) => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
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
            <CCollapse visible={details.includes(item.id)}>
              <div className="p-3">
                <h5>{item.name}</h5>
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
                </CButton>
              </div>
            </CCollapse>
          ),
        }}
      />

      <div className="mt-3">
        <strong>Selected IDs:</strong> {JSON.stringify(selectedIds)}
      </div>
    </>
  );
};

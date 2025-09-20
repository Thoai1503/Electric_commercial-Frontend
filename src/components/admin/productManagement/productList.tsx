import { useState } from "react";
import { CBadge, CButton, CCollapse, CSmartTable } from "@coreui/react-pro";

import type { Product } from "../../../type/Product"; // Import interface
import { FiChevronDown, FiChevronUp, FiEye } from "react-icons/fi";

import { useQuery } from "@tanstack/react-query";
import productQuery from "../../../module/admin/query/product";
import { Link } from "react-router-dom";

// Badge theo status (0 = Inactive, 1 = Active)
const getBadge = (status: number) => {
  switch (status) {
    case 1:
      return "success"; // Active
    case 0:
      return "secondary"; // Inactive
    default:
      return "primary";
  }
};

export const ProductList = () => {
  const [details, setDetails] = useState<number[]>([]);

  const { data: products } = useQuery(productQuery.list);
  // Giả lập fetch API

  const columns = [
    { key: "id", label: "ID", _style: { width: "5%" } },
    { key: "name", label: "Tên sản phẩm", _style: { width: "25%" } },
    { key: "brand", label: "Thương hiệu", _style: { width: "20%" } },
    { key: "category", label: "Danh mục", _style: { width: "20%" } },
    { key: "status", label: "Trạng thái", _style: { width: "10%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "10%" },
      filter: false,
      sorter: false,
    },
  ];

  const toggleDetails = (id: number) => {
    const position = details.indexOf(id);
    let newDetails = [...details];
    if (position === -1) {
      newDetails = [...details, id];
    } else {
      newDetails.splice(position, 1);
    }
    setDetails(newDetails);
  };

  return (
    <CSmartTable
      cleaner
      clickableRows
      columns={columns}
      columnFilter
      columnSorter
      footer
      items={products}
      itemsPerPageSelect
      itemsPerPage={5}
      pagination
      scopedColumns={{
        brand: (item: Product) => <td>{item.brand?.name}</td>,
        category: (item: Product) => <td>{item.category?.name}</td>,
        status: (item: Product) => (
          <td>
            <CBadge color={getBadge(item.status)}>
              {item.status === 1 ? "Active" : "Inactive"}
            </CBadge>
          </td>
        ),
        show_details: (item: Product) => (
          <td className="py-2">
            <CButton
              style={{ marginRight: "5px", marginLeft: "5px" }}
              color="primary"
              variant="outline"
              shape="square"
              size="sm"
              onClick={() => toggleDetails(item.id)}
            >
              {" "}
              {details.includes(item.id) ? <FiChevronUp /> : <FiChevronDown />}
            </CButton>
            <CButton color="primary" variant="outline" size="sm">
              <Link to={`../product/${item.id}`}>
                <FiEye />
              </Link>
            </CButton>
          </td>
        ),
        details: (item: any) => (
          <CCollapse visible={details.includes(item.id)}>
            <div className="p-3">
              <h4>{item.name}</h4>
              <p>
                <b>Brand:</b> {item.brand?.name} <br />
                <b>Category:</b> {item.category?.name} <br />
                <b>Status:</b> {item.status === 1 ? "Active" : "Inactive"}
              </p>
              <CButton size="sm" color="info">
                Edit
              </CButton>
              <CButton size="sm" color="danger" className="ms-1">
                Delete
              </CButton>
            </div>
          </CCollapse>
        ),
      }}
      selectable
      sorterValue={{ column: "id", state: "asc" }}
      tableFilter
      tableProps={{
        className: "add-this-custom-class",
        responsive: true,
        striped: true,
        hover: true,
      }}
      tableBodyProps={{
        className: "align-middle",
      }}
    />
  );
};

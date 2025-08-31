import { useState } from "react";
import {
  CAvatar,
  CBadge,
  CButton,
  CCollapse,
  CSmartTable,
} from "@coreui/react-pro";
const getBadge = (status: string) => {
  switch (status) {
    case "Active": {
      return "success";
    }
    case "Inactive": {
      return "secondary";
    }
    case "Pending": {
      return "warning";
    }
    case "Banned": {
      return "danger";
    }
    default: {
      return "primary";
    }
  }
};

export const ProductList = () => {
  const [details, setDetails] = useState<number[]>([]);
  const columns = [
    {
      key: "avatar",
      label: "",
      filter: false,
      sorter: false,
    },
    {
      key: "Tên",
      _style: { width: "20%" },
    },

    {
      key: "registered",
      sorter: (item1: any, item2: any) => {
        const a = new Date(item1?.registered);
        const b = new Date(item2?.registered);
        return a > b ? 1 : b > a ? -1 : 0;
      },
    },
    {
      key: "role",
      _style: { width: "20%" },
    },
    "status",
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      filter: false,
      sorter: false,
    },
  ];
  const items = [
    {
      id: 1,
      Tên: "Samppa Nori",
      avatar: "1.jpg",
      registered: "2021/03/01",
      role: "Member",
      status: "Active",
    },
    {
      id: 2,
      Tên: "Estavan Lykos",
      avatar: "2.jpg",
      registered: "2018/02/07",
      role: "Staff",
      status: "Banned",
    },
    {
      id: 3,
      Tên: "Chetan Mohamed",
      avatar: "3.jpg",
      registered: "2020/01/15",
      role: "Admin",
      status: "Inactive",
      _selected: true,
    },
    {
      id: 4,
      Tên: "Derick Maximinus",
      avatar: "4.jpg",
      registered: "2019/04/05",
      role: "Member",
      status: "Pending",
    },
    {
      id: 5,
      Tên: "Friderik Dávid",
      avatar: "5.jpg",
      registered: "2022/03/25",
      role: "Staff",
      status: "Active",
    },
    {
      id: 6,
      Tên: "Yiorgos Avraamu",
      avatar: "6.jpg",
      registered: "2017/01/01",
      role: "Member",
      status: "Active",
    },
    {
      id: 7,
      Tên: "Avram Tarasios",
      avatar: "7.jpg",
      registered: "2016/02/12",
      role: "Staff",
      status: "Banned",
      _selected: true,
    },
    {
      id: 8,
      Tên: "Quintin Ed",
      avatar: "8.jpg",
      registered: "2023/01/21",
      role: "Admin",
      status: "Inactive",
    },
    {
      id: 9,
      Tên: "Enéas Kwadwo",
      avatar: "9.jpg",
      registered: "2024/03/10",
      role: "Member",
      status: "Pending",
    },
    {
      id: 10,
      Tên: "Agapetus Tadeáš",
      avatar: "10.jpg",
      registered: "2015/01/10",
      role: "Staff",
      status: "Active",
    },
    {
      id: 11,
      Tên: "Carwyn Fachtna",
      avatar: "11.jpg",
      registered: "2014/04/01",
      role: "Member",
      status: "Active",
    },
    {
      id: 12,
      Tên: "Nehemiah Tatius",
      avatar: "12.jpg",
      registered: "2013/01/05",
      role: "Staff",
      status: "Banned",
      _selected: true,
    },
    {
      id: 13,
      Tên: "Ebbe Gemariah",
      avatar: "13.jpg",
      registered: "2012/02/25",
      role: "Admin",
      status: "Inactive",
    },
    {
      id: 14,
      Tên: "Eustorgios Amulius",
      avatar: "14.jpg",
      registered: "2011/03/19",
      role: "Member",
      status: "Pending",
    },
    {
      id: 15,
      Tên: "Leopold Gáspár",
      avatar: "15.jpg",
      registered: "2010/02/01",
      role: "Staff",
      status: "Active",
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
      activePage={2}
      cleaner
      clickableRows
      columns={columns}
      columnFilter
      columnSorter
      footer
      items={items}
      itemsPerPageSelect
      itemsPerPage={5}
      pagination
      onFilteredItemsChange={(items) => {
        console.log("onFilteredItemsChange");
        console.table(items);
      }}
      onSelectedItemsChange={(items) => {
        console.log("onSelectedItemsChange");
        console.table(items);
      }}
      scopedColumns={{
        avatar: (item: any) => (
          <td>
            <CAvatar src={`../../images/avatars/${item?.avatar}`} />
          </td>
        ),
        registered: (item: any) => {
          const date = new Date(item?.registered);
          const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
          };
          return <td>{date.toLocaleDateString("en-US", options)}</td>;
        },
        status: (item: any) => (
          <td>
            <CBadge color={getBadge(item?.status)}>{item?.status}</CBadge>
          </td>
        ),
        show_details: (item: any) => {
          return (
            <td className="py-2">
              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() => {
                  toggleDetails(item?.id);
                }}
              >
                {details.includes(item?.id) ? "Hide" : "Show"}
              </CButton>
            </td>
          );
        },
        details: (item) => {
          return (
            <CCollapse visible={details.includes(item?.id)}>
              <div className="p-3">
                <h4>{item?.Tên}</h4>
                <p className="text-body-secondary">
                  User since: {item?.registered}
                </p>
                <CButton size="sm" color="info">
                  User Settings
                </CButton>
                <CButton size="sm" color="danger" className="ms-1">
                  Delete
                </CButton>
              </div>
            </CCollapse>
          );
        },
      }}
      selectable
      sorterValue={{ column: "status", state: "asc" }}
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

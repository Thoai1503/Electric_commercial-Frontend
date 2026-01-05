import { useQuery } from "@tanstack/react-query";
import { orderQuery } from "../../module/client/query/order";
import { useMemo } from "react";

const OrderHistory = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const { data } = useQuery(orderQuery.get_by_user_id(user.id));
  const list = useMemo(() => data?.sort((a, b) => b.id - a.id), [data]);
  return (
    <div className="container-fluid mt-5 mb-3">
      <div className="row align-items-center">
        <div className="col-sm-6">
          <div className="page-title-box">
            <h4 className="font-size-18">Lịch sử đơn hàng</h4>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="javascript: void(0);">
                  <i className="mdi mdi-home-outline"></i>
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="javascript: void(0);">Ecommerce</a>
              </li>
              <li className="breadcrumb-item active">Order History</li>
            </ol>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="float-end d-none d-md-block">
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle waves-effect waves-light"
                type="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="mdi mdi-settings me-2"></i> Settings
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Separated link
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div
                id="datatable_wrapper"
                className="dataTables_wrapper dt-bootstrap4 no-footer"
              >
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <div className="dataTables_length" id="datatable_length">
                      <label>
                        Show{" "}
                        <select
                          name="datatable_length"
                          aria-controls="datatable"
                          className="custom-select custom-select-sm form-control form-control-sm"
                        >
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select>{" "}
                        entries
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div id="datatable_filter" className="dataTables_filter">
                      <label>
                        Search:
                        <input
                          type="search"
                          className="form-control form-control-sm"
                          placeholder=""
                          aria-controls="datatable"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <table
                      id="datatable"
                      className="table table-striped dt-responsive nowrap table-vertical dataTable no-footer dtr-inline"
                      style={{
                        borderCollapse: "collapse",
                        borderSpacing: "0px",
                        width: "100%",
                      }}
                      aria-describedby="datatable_info"
                    >
                      <thead>
                        <tr>
                          <th
                            className="sorting sorting_asc"
                            aria-controls="datatable"
                            style={{ width: "72px" }}
                            aria-sort="ascending"
                            aria-label="Order ID: activate to sort column descending"
                          >
                            Order ID
                          </th>
                          <th
                            className="sorting"
                            aria-controls="datatable"
                            style={{ width: "63px" }}
                            aria-label="Amount: activate to sort column ascending"
                          >
                            Amount
                          </th>
                          <th
                            className="sorting"
                            aria-controls="datatable"
                            style={{ width: "84px" }}
                            aria-label="Order Date: activate to sort column ascending"
                          >
                            Order Date
                          </th>
                          <th
                            className="sorting"
                            aria-controls="datatable"
                            style={{ width: "69px" }}
                            aria-label="Payment: activate to sort column ascending"
                          >
                            Payment
                          </th>
                          <th
                            className="sorting"
                            aria-controls="datatable"
                            style={{ width: " 133px" }}
                            aria-label="Billing Name: activate to sort column ascending"
                          >
                            Billing Name
                          </th>
                          <th
                            className="sorting"
                            aria-controls="datatable"
                            style={{ width: "64px" }}
                            aria-label="Status: activate to sort column ascending"
                          >
                            Status
                          </th>
                          <th
                            className="sorting"
                            aria-controls="datatable"
                            style={{ width: "54px" }}
                            aria-label="Action: activate to sort column ascending"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {list?.map((item, index) => {
                          let data = {
                            status: "",
                            badge: "",
                          };
                          switch (item.status) {
                            case 3:
                              data.status = "Đã huỷ";
                              data.badge = "danger";
                              break;
                            case 2:
                              data.status = "Đã thanh toán";
                              data.badge = "success";
                              break;
                            case 1:
                              data.status = "Đang thanh toán";
                              data.badge = "warning";
                              break;
                          }
                          const created_date = new Date(
                            item.created_at
                          ).toLocaleString("vi-VN");
                          return (
                            <tr className={index % 2 != 0 ? "even" : "odd"}>
                              <td className="sorting_1 dtr-control">
                                <a href="#" className="font-weight-bold">
                                  #{item.id}
                                </a>
                              </td>
                              <td>{item.total.toLocaleString("vi-VN")} VNĐ</td>
                              <td>{created_date}</td>
                              <td>
                                <i className="fab fa-cc-amex text-muted font-size-20"></i>{" "}
                              </td>
                              <td>Lasse C. Overgaard</td>
                              <td>
                                <span
                                  className={`badge bg-${data.badge}-subtle text-${data.badge}`}
                                >
                                  {data.status}
                                </span>
                              </td>
                              <td>
                                <button>Chi tiết</button>
                              </td>
                            </tr>
                          );
                        })}
                        {/* <tr className="odd">
                          <td className="sorting_1 dtr-control">
                            <a href="#" className="font-weight-bold">
                              #12354781
                            </a>
                          </td>
                          <td>$22</td>
                          <td>Jul 11, 2019</td>
                          <td>
                            <i className="fab fa-cc-amex text-muted font-size-20"></i>{" "}
                          </td>
                          <td>Lasse C. Overgaard</td>
                          <td>
                            <span className="badge bg-success-subtle text-success">
                              Paid
                            </span>
                          </td>
                          <td>
                            <a
                              href="javascript:void(0);"
                              className="me-3 text-primary"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Edit"
                            >
                              <i className="mdi mdi-pencil font-size-18"></i>
                            </a>
                            <a
                              href="javascript:void(0);"
                              className="text-danger"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Delete"
                            >
                              <i className="mdi mdi-close font-size-18"></i>
                            </a>
                          </td>
                        </tr>
                        <tr className="even">
                          <td className="dtr-control sorting_1">
                            <a href="#" className="font-weight-bold">
                              #12365474
                            </a>
                          </td>
                          <td>$1,541</td>
                          <td>Jul 10, 2019</td>
                          <td>
                            <i className="fab fa-cc-mastercard text-muted font-size-20"></i>{" "}
                          </td>
                          <td>Johan E. Knudsen</td>
                          <td>
                            <span className="badge bg-danger-subtle text-danger ">
                              Chargeback
                            </span>
                          </td>
                          <td>
                            <a
                              href="javascript:void(0);"
                              className="me-3 text-primary"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Edit"
                            >
                              <i className="mdi mdi-pencil font-size-18"></i>
                            </a>
                            <a
                              href="javascript:void(0);"
                              className="text-danger"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Delete"
                            >
                              <i className="mdi mdi-close font-size-18"></i>
                            </a>
                          </td>
                        </tr> */}
                        {/* <tr className="odd">
                          <td className="dtr-control sorting_1">
                            <a href="#" className="font-weight-bold">
                              #23145216
                            </a>
                          </td>
                          <td>$22</td>
                          <td>Jul 11, 2019</td>
                          <td>
                            <i className="fab fa-cc-amex text-muted font-size-20"></i>{" "}
                          </td>
                          <td>Lasse C. Overgaard</td>
                          <td>
                            <span className="badge bg-success-subtle text-success">
                              Paid
                            </span>
                          </td>
                          <td>
                            <a
                              href="javascript:void(0);"
                              className="me-3 text-primary"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Edit"
                            >
                              <i className="mdi mdi-pencil font-size-18"></i>
                            </a>
                            <a
                              href="javascript:void(0);"
                              className="text-danger"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Delete"
                            >
                              <i className="mdi mdi-close font-size-18"></i>
                            </a>
                          </td>
                        </tr>
                        <tr className="even">
                          <td className="sorting_1 dtr-control">
                            <a href="#" className="font-weight-bold">
                              #32147851
                            </a>
                          </td>
                          <td>$421</td>
                          <td>Jul 08, 2019</td>
                          <td>
                            <i className="fab fa-cc-paypal text-muted font-size-20"></i>{" "}
                          </td>
                          <td>Nikolaj S. Henriksen</td>
                          <td>
                            <span className="badge bg-success-subtle text-success">
                              Paid
                            </span>
                          </td>
                          <td>
                            <a
                              href="javascript:void(0);"
                              className="me-3 text-primary"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Edit"
                            >
                              <i className="mdi mdi-pencil font-size-18"></i>
                            </a>
                            <a
                              href="javascript:void(0);"
                              className="text-danger"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Delete"
                            >
                              <i className="mdi mdi-close font-size-18"></i>
                            </a>
                          </td>
                        </tr>
                        <tr className="odd">
                          <td className="sorting_1 dtr-control">
                            <a href="#" className="font-weight-bold">
                              #32147851
                            </a>
                          </td>
                          <td>$421</td>
                          <td>Jul 08, 2019</td>
                          <td>
                            <i className="fab fa-cc-paypal text-muted font-size-20"></i>{" "}
                          </td>
                          <td>Nikolaj S. Henriksen</td>
                          <td>
                            <span className="badge bg-success-subtle text-success">
                              Paid
                            </span>
                          </td>
                          <td>
                            <a
                              href="javascript:void(0);"
                              className="me-3 text-primary"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Edit"
                            >
                              <i className="mdi mdi-pencil font-size-18"></i>
                            </a>
                            <a
                              href="javascript:void(0);"
                              className="text-danger"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Delete"
                            >
                              <i className="mdi mdi-close font-size-18"></i>
                            </a>
                          </td>
                        </tr>
                        <tr className="even">
                          <td className="dtr-control sorting_1">
                            <a href="#" className="font-weight-bold">
                              #32569874
                            </a>
                          </td>
                          <td>$54</td>
                          <td>Jul 09, 2019</td>
                          <td>
                            <i className="fab fa-cc-visa text-muted font-size-20"></i>{" "}
                          </td>
                          <td>Herbert C. Patton</td>
                          <td>
                            <span className="badge bg-success-subtle text-success">
                              Paid
                            </span>
                          </td>
                          <td>
                            <a
                              href="javascript:void(0);"
                              className="me-3 text-primary"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Edit"
                            >
                              <i className="mdi mdi-pencil font-size-18"></i>
                            </a>
                            <a
                              href="javascript:void(0);"
                              className="text-danger"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Delete"
                            >
                              <i className="mdi mdi-close font-size-18"></i>
                            </a>
                          </td>
                        </tr>
                        <tr className="odd">
                          <td className="dtr-control sorting_1">
                            <a href="#" className="font-weight-bold">
                              #45123698
                            </a>
                          </td>
                          <td>$241</td>
                          <td>July 14, 2019</td>
                          <td>
                            <i className="fab fa-cc-paypal text-muted font-size-20"></i>{" "}
                          </td>
                          <td>Nikolaj S. Henriksen</td>
                          <td>
                            <span className="badge bg-warning-subtle text-warning ">
                              Refund
                            </span>
                          </td>
                          <td>
                            <a
                              href="javascript:void(0);"
                              className="me-3 text-primary"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Edit"
                            >
                              <i className="mdi mdi-pencil font-size-18"></i>
                            </a>
                            <a
                              href="javascript:void(0);"
                              className="text-danger"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Delete"
                            >
                              <i className="mdi mdi-close font-size-18"></i>
                            </a>
                          </td>
                        </tr>
                        <tr className="even">
                          <td className="sorting_1 dtr-control">
                            <a href="#" className="font-weight-bold">
                              #50025441
                            </a>
                          </td>
                          <td>$845</td>
                          <td>Jul 08, 2019</td>
                          <td>
                            <i className="fab fa-cc-discover text-muted font-size-20"></i>{" "}
                          </td>
                          <td>Mathias N. Klausen</td>
                          <td>
                            <span className="badge bg-warning-subtle text-warning ">
                              Refund
                            </span>
                          </td>
                          <td>
                            <a
                              href="javascript:void(0);"
                              className="me-3 text-primary"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Edit"
                            >
                              <i className="mdi mdi-pencil font-size-18"></i>
                            </a>
                            <a
                              href="javascript:void(0);"
                              className="text-danger"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Delete"
                            >
                              <i className="mdi mdi-close font-size-18"></i>
                            </a>
                          </td>
                        </tr>
                        <tr className="odd">
                          <td className="sorting_1 dtr-control">
                            <a href="#" className="font-weight-bold">
                              #52140300
                            </a>
                          </td>
                          <td>$45</td>
                          <td>Jul 20, 2019</td>
                          <td>
                            <i className="fab fa-cc-visa text-muted font-size-20"></i>{" "}
                          </td>
                          <td>Herbert C. Patton</td>
                          <td>
                            <span className="badge bg-success-subtle text-success">
                              Paid
                            </span>
                          </td>
                          <td>
                            <a
                              href="javascript:void(0);"
                              className="me-3 text-primary"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Edit"
                            >
                              <i className="mdi mdi-pencil font-size-18"></i>
                            </a>
                            <a
                              href="javascript:void(0);"
                              className="text-danger"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Delete"
                            >
                              <i className="mdi mdi-close font-size-18"></i>
                            </a>
                          </td>
                        </tr>
                        <tr className="even">
                          <td className="sorting_1 dtr-control">
                            <a href="#" className="font-weight-bold">
                              #52146321
                            </a>
                          </td>
                          <td>$652</td>
                          <td>Jul 02, 2019</td>
                          <td>
                            <i className="fab fa-cc-mastercard text-muted font-size-20"></i>{" "}
                          </td>
                          <td>Lasse C. Overgaard</td>
                          <td>
                            <span className="badge bg-success-subtle text-success">
                              Paid
                            </span>
                          </td>
                          <td>
                            <a
                              href="javascript:void(0);"
                              className="me-3 text-primary"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Edit"
                            >
                              <i className="mdi mdi-pencil font-size-18"></i>
                            </a>
                            <a
                              href="javascript:void(0);"
                              className="text-danger"
                              data-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-original-title="Delete"
                            >
                              <i className="mdi mdi-close font-size-18"></i>
                            </a>
                          </td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-5">
                    <div
                      className="dataTables_info"
                      id="datatable_info"
                      role="status"
                      aria-live="polite"
                    >
                      Showing 1 to 10 of 21 entries
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-7">
                    <div
                      className="dataTables_paginate paging_simple_numbers"
                      id="datatable_paginate"
                    >
                      <ul className="pagination">
                        <li
                          className="paginate_button page-item previous disabled"
                          id="datatable_previous"
                        >
                          <a
                            aria-controls="datatable"
                            aria-disabled="true"
                            role="link"
                            data-dt-idx="previous"
                            className="page-link"
                          >
                            Previous
                          </a>
                        </li>
                        <li className="paginate_button page-item active">
                          <a
                            href="#"
                            aria-controls="datatable"
                            role="link"
                            aria-current="page"
                            data-dt-idx="0"
                            className="page-link"
                          >
                            1
                          </a>
                        </li>
                        <li className="paginate_button page-item ">
                          <a
                            href="#"
                            aria-controls="datatable"
                            role="link"
                            data-dt-idx="1"
                            className="page-link"
                          >
                            2
                          </a>
                        </li>
                        <li className="paginate_button page-item ">
                          <a
                            href="#"
                            aria-controls="datatable"
                            role="link"
                            data-dt-idx="2"
                            className="page-link"
                          >
                            3
                          </a>
                        </li>
                        <li
                          className="paginate_button page-item next"
                          id="datatable_next"
                        >
                          <a
                            href="#"
                            aria-controls="datatable"
                            role="link"
                            data-dt-idx="next"
                            className="page-link"
                          >
                            Next
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;

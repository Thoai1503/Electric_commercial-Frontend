import { useAddAddressModel } from "../../../module/client/hook/checkout_page/useAddAddressModel";
import "../../../scss/client.scss";
import Modal from "react-bootstrap/Modal";

interface Prop {
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
  user_id: number;
}
const AddAddressModal = ({ show, handleClose, user_id }: Prop) => {
  const {
    address,
    provinceList,
    handleChangeProvince,
    districts,
    wards,
    handleChange,
    handleSubmit,
    handleChangeDistrict,
  } = useAddAddressModel(user_id, handleClose);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h5>
            <strong>Thông tin người nhận hàng</strong>
          </h5>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p className="text">
              <strong>Họ tên</strong>
            </p>
            <input
              className="input-placeholder"
              type="text"
              name="full_name"
              value={address.full_name}
              onChange={handleChange}
              placeholder="  Vui lòng nhập tên người nhận"
              style={{
                width: "100%",
                border: "1px solid lightgray",
                borderRadius: "3px",
                height: "30px",
              }}
            />
          </div>
          <div className="row mt-4">
            <div className="col-lg-6">
              <p className="text">
                <strong>Số điện thoại</strong>
              </p>
              <input
                className="input-placeholder"
                type="text"
                name="phone"
                value={address.phone}
                placeholder="  Nhập số điện thoại"
                style={{
                  width: "100%",
                  border: "1px solid lightgray",
                  borderRadius: "3px",
                  height: "30px",
                }}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6">
              <p className="text">
                <strong>Email</strong>
              </p>
              <input
                className="input-placeholder"
                type="text"
                placeholder="  Nhập email của bạn"
                style={{
                  width: "100%",
                  border: "1px solid lightgray",
                  borderRadius: "3px",
                  height: "30px",
                }}
              />
            </div>
          </div>
          <hr />
          <h6>
            <strong>Địa chỉ nhận hàng</strong>
          </h6>
          <div className="row mt-4">
            <div className="col-lg-6">
              <p className="text">
                <strong>Tỉnh/Thành phố</strong>
              </p>
              <select
                style={{
                  width: "100%",
                  height: "29px",
                  border: "1px solid lightgray",
                  borderRadius: "3px",
                  color: "#000", // màu chữ bình thường
                }}
                name="province_id"
                onChange={(event) => {
                  handleChangeProvince(event);
                  handleChange(event);
                }}
              >
                <option value="" style={{ color: "gray" }}>
                  Chọn
                </option>

                {provinceList?.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="col-lg-6">
              <p className="text">
                <strong>Quận/Huyện</strong>
              </p>
              <select
                disabled={!(districts && districts.length > 0)}
                style={{
                  width: "100%",
                  height: "29px",
                  border: "1px solid lightgray",
                  borderRadius: "3px",
                  color: districts && districts.length > 0 ? "#000" : "#6c757d",
                  backgroundColor:
                    districts && districts.length > 0 ? "white" : "#e9ecef",
                  cursor:
                    districts && districts.length > 0
                      ? "pointer"
                      : "not-allowed",
                }}
                name="district_id"
                value={address.district_id}
                onChange={(event) => {
                  handleChangeDistrict(event);
                  handleChange(event);
                }}
              >
                <option value="" style={{ color: "gray" }}>
                  Chọn
                </option>
                {districts &&
                  districts.length > 0 &&
                  districts.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
              </select>
            </div>
          </div>
          <div className="row mt-4 mb-4">
            <div className="col-lg-6">
              <p className="text">
                <strong>Phường/Xã</strong>
              </p>
              <select
                disabled={!(wards && wards.length > 0)}
                style={{
                  width: "100%",
                  height: "29px",
                  border: "1px solid lightgray",
                  borderRadius: "3px",
                  color: wards && wards.length > 0 ? "#000" : "#6c757d",
                  backgroundColor:
                    wards && wards.length > 0 ? "white" : "#e9ecef",
                  cursor: wards && wards.length > 0 ? "pointer" : "not-allowed",
                }}
                name="ward_id"
                value={address.ward_id}
                onChange={handleChange}
              >
                <option value="" style={{ color: "gray" }}>
                  Chọn
                </option>

                {wards &&
                  wards.length > 0 &&
                  wards.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
              </select>
            </div>
            <div className="col-lg-6">
              <p className="text">
                <strong>Địa chỉ cụ thể</strong>
              </p>
              <input
                className="input-placeholder"
                type="text"
                placeholder="  Số nhà, ngõ, tên đường"
                style={{
                  width: "100%",
                  border: "1px solid lightgray",
                  borderRadius: "3px",
                  color: "lightgray",
                  height: "30px",
                }}
                name="address_detail"
                value={address.address_detail}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex">
              <input type="checkbox" id="" className="mt-3 " />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
          <button
            style={{
              borderRadius: "3px",
              border: "1px solid #06b6d4",
              color: "#06b6d4",
              backgroundColor: "white",
              padding: "7px",
              fontSize: "12px",
            }}
          >
            Huỷ bỏ
          </button>
          <button
            style={{
              borderRadius: "3px",
              border: "1px solid #06b6d4",
              color: "white",
              backgroundColor: "#06b6d4",
              padding: "7px",
              fontSize: "12px",
            }}
            onClick={handleSubmit}
          >
            Lưu địa chỉ
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddAddressModal;

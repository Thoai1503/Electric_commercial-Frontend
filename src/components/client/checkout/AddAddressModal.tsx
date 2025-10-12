import "../../../scss/client.scss";
import Modal from "react-bootstrap/Modal";

interface Prop {
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
}
const AddAddressModal = ({ show, handleClose }: Prop) => {
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
                placeholder="  Vui lòng nhập tên người nhận"
                style={{
                  width: "100%",
                  border: "1px solid lightgray",
                  borderRadius: "3px",
                  height: "30px",
                }}
              />
            </div>
            <div className="col-lg-6">
              <p className="text">
                <strong>Email</strong>
              </p>
              <input
                className="input-placeholder"
                type="text"
                placeholder="  Vui lòng nhập tên người nhận"
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
              >
                <option value="" disabled style={{ color: "gray" }}>
                  Chọn
                </option>
                <option value="1">Tùy chọn 1</option>
                <option value="2">Tùy chọn 2</option>
              </select>
            </div>
            <div className="col-lg-6">
              <p className="text">
                <strong>Quận/Huyện</strong>
              </p>
              <select
                disabled
                style={{
                  width: "100%",
                  height: "29px",
                  border: "1px solid lightgray",
                  borderRadius: "3px",
                  color: "#000", // màu chữ bình thường
                }}
              >
                <option value="" style={{ color: "gray" }}>
                  Chọn
                </option>
                <option value="1">Tùy chọn 1</option>
                <option value="2">Tùy chọn 2</option>
              </select>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-6">
              <p className="text">
                <strong>Phường/Xã</strong>
              </p>
              <select
                style={{
                  width: "100%",
                  height: "29px",
                  border: "1px solid lightgray",
                  borderRadius: "3px",
                  color: "#000", // màu chữ bình thường
                }}
              >
                <option value="" disabled style={{ color: "gray" }}>
                  Chọn
                </option>
                <option value="1">Tùy chọn 1</option>
                <option value="2">Tùy chọn 2</option>
              </select>
            </div>
            <div className="col-lg-6">
              <p className="text">
                <strong>Địa chỉ cụ thể</strong>
              </p>
              <select
                disabled
                style={{
                  width: "100%",
                  height: "29px",
                  border: "1px solid lightgray",
                  borderRadius: "3px",
                  color: "#000", // màu chữ bình thường
                }}
              >
                <option value="" style={{ color: "gray" }}>
                  Chọn
                </option>
                <option value="1">Tùy chọn 1</option>
                <option value="2">Tùy chọn 2</option>
              </select>
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddAddressModal;

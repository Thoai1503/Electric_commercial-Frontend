const Product = () => {
  return (
    <div className="container">
      <h1>Products</h1>
      <div className="content row">
        <div className="col-lg-2 bg-white rounded">
          <div className="">
            {" "}
            <p className="text">Bộ lọc tìm kiếm</p>
          </div>
        </div>

        <div className="col-lg-9  ">
          <div className="p-3 bg-white rounded">
            {" "}
            <h3>đây là sản phẩm</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

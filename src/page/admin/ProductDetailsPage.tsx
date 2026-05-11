import GeneralInfoSection from "../../components/admin/product_details_page/GeneralInfoSection.tsx";
import { useParams } from "react-router-dom";
import { useProductDetailPage } from "../../module/admin/hook/product_detail_page";
import AttributeConfigSestion from "../../components/admin/product_details_page/AttributeConfigSestion.tsx";
import VariantConfigSection from "../../components/admin/product_details_page/VariantConfigSection.tsx";
import ImagesForVariant from "../../components/admin/product_details_page/ImagesForVariant.tsx";

const ProductDetails = () => {
  const { id } = useParams();
  const productId = Number(id);
  const { tabs, nextTab, prevTab, activeTab, setActiveTab } =
    useProductDetailPage(productId);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <GeneralInfoSection id={productId} />;

      case 1:
        return (
          <AttributeConfigSestion
            id={productId}
            nextTab={nextTab}
            prevTab={prevTab}
          />
        );

      case 2:
        return (
          <VariantConfigSection
            id={productId}
            nextTab={nextTab}
            prevTab={prevTab}
          />
        );

      case 3:
        return <ImagesForVariant id={productId} prevTab={prevTab} />;

      default:
        return null;
    }
  };

  return (
    <div className="col-12 px-0">
      <div className="mt-4 mb-5">
        <div
          className="card border-0 shadow mb-4"
          style={{
            background: "linear-gradient(135deg, #111827 0%, #1e293b 100%)",
          }}
        >
          <div className="card-body p-4 p-lg-5">
            <div className="d-flex flex-column flex-lg-row justify-content-between gap-4 align-items-lg-center">
              <div>
                <div
                  className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border border-primary text-primary small fw-semibold"
                  style={{ background: "rgba(13,110,253,0.15)" }}
                >
                  Chi tiết sản phẩm #{productId}
                </div>
                <h2 className="mt-3 mb-2 fw-bold text-white">
                  Thiết lập sản phẩm
                </h2>
                <p className="mb-0" style={{ color: "#94a3b8", maxWidth: 720 }}>
                  Hoàn thiện thông tin chung, cấu hình thuộc tính, biến thể và
                  hình ảnh trong một luồng thao tác tập trung.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="p-3 p-md-4 border-bottom">
              <div className="d-flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-2 ${
                      activeTab === tab.id
                        ? "btn-primary"
                        : "btn-light border border-primary-subtle text-primary"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span>{tab.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

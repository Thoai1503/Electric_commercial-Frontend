import GeneralInfoSection from "../../components/admin/product_details_page/GeneralInfoSection";
import { useParams } from "react-router-dom";
import { useProductDetailPage } from "../../module/admin/hook/product_detail_page";
import AttributeConfigSestion from "../../components/admin/product_details_page/AttributeConfigSestion";
import VariantConfigSection from "../../components/admin/product_details_page/VariantConfigSection";
import ImagesForVariant from "../../components/admin/product_details_page/ImagesForVariant";

const ProductDetails = () => {
  const { id } = useParams();
  const { tabs, nextTab, prevTab, activeTab, setActiveTab } =
    useProductDetailPage(parseInt(id!));

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <GeneralInfoSection id={parseInt(id!)} />;

      case 1:
        return (
          <AttributeConfigSestion
            id={parseInt(id!)}
            nextTab={nextTab}
            prevTab={prevTab}
          />
        );

      case 2:
        return (
          <VariantConfigSection
            id={parseInt(id!)}
            nextTab={nextTab}
            prevTab={prevTab}
          />
        );

      case 3:
        return <ImagesForVariant id={parseInt(id!)} prevTab={prevTab} />;

      default:
        return null;
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <a
          href="#"
          className="text-decoration-none"
          style={{ color: "#6f42c1" }}
        >
          Home
        </a>
      </nav>

      {/* Main Form Card */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {/* Tabs Navigation */}
          <div className="border-bottom">
            <ul className="nav nav-tabs border-0 px-4">
              {tabs.map((tab) => (
                <li key={tab.id} className="nav-item">
                  <button
                    className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      border: "none",
                      borderBottom:
                        activeTab === tab.id
                          ? "2px solid #6f42c1"
                          : "2px solid transparent",
                      backgroundColor: "transparent",
                    }}
                  >
                    {tab.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tab Content */}
          <div className="p-4">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

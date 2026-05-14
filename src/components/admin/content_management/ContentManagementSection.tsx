import { useState } from "react";
import { FileText, Clock, GitBranch, AlertCircle } from "lucide-react";
import ContentVersionsList from "./ContentVersionsList";
import VersionDetailModal from "./VersionDetailModal";
import VersionComparisonModal from "./VersionComparisonModal";

interface Props {
  productId: number;
  productName?: string;
}

type ModalType = "detail" | "compare" | null;

interface ComparisonState {
  v1?: number;
  v2?: number;
}

const ContentManagementSection = ({ productId, productName }: Props) => {
  const [selectedVersionId, setSelectedVersionId] = useState<number | null>(
    null,
  );
  const [modalType, setModalType] = useState<ModalType>(null);
  const [comparisonVersions] = useState<ComparisonState>({});

  const handleVersionSelect = (versionId: number) => {
    setSelectedVersionId(versionId);
    setModalType("detail");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedVersionId(null);
  };

  return (
    <div className="col-12 px-0">
      <div className="mt-4 mb-5">
        {/* Header */}
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
                  <FileText size={16} />
                  Quản lý Content
                </div>
                <h2 className="mt-3 mb-2 fw-bold text-white">
                  Quản lý phiên bản nội dung
                </h2>
                <p className="mb-0" style={{ color: "#94a3b8", maxWidth: 720 }}>
                  {productName && (
                    <>
                      Sản phẩm: <strong>{productName}</strong>
                      <br />
                    </>
                  )}
                  Xem lịch sử, so sánh, và quản lý các phiên bản nội dung HTML
                  của sản phẩm.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "rgba(13,110,253,0.1)",
                    }}
                  >
                    <Clock size={24} className="text-primary" />
                  </div>
                  <div>
                    <h6 className="mb-1 text-muted small fw-semibold">
                      Versions
                    </h6>
                    <p className="mb-0 h5 fw-bold">History & Tracking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "rgba(198,39,83,0.1)",
                    }}
                  >
                    <GitBranch size={24} style={{ color: "#c62753" }} />
                  </div>
                  <div>
                    <h6 className="mb-1 text-muted small fw-semibold">
                      Draft & Publish
                    </h6>
                    <p className="mb-0 h5 fw-bold">Version Control</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "rgba(255,193,7,0.1)",
                    }}
                  >
                    <AlertCircle size={24} style={{ color: "#ffc107" }} />
                  </div>
                  <div>
                    <h6 className="mb-1 text-muted small fw-semibold">
                      Compare & Restore
                    </h6>
                    <p className="mb-0 h5 fw-bold">Change Management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <ContentVersionsList
          productId={productId}
          onVersionSelect={handleVersionSelect}
        />

        {/* Modals */}
        {modalType === "detail" && selectedVersionId && (
          <VersionDetailModal
            productId={productId}
            versionId={selectedVersionId}
            onClose={closeModal}
          />
        )}

        {modalType === "compare" &&
          comparisonVersions.v1 &&
          comparisonVersions.v2 && (
            <VersionComparisonModal
              productId={productId}
              version1Id={comparisonVersions.v1}
              version2Id={comparisonVersions.v2}
              onClose={closeModal}
            />
          )}
      </div>
    </div>
  );
};

export default ContentManagementSection;

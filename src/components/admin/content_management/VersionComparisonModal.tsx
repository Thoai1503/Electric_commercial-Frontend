import { useEffect, useState } from "react";
import { Loader, AlertCircle, ArrowRightLeft } from "lucide-react";
import {
  ContentVersionService,
  type CompareResult,
} from "../../../service/contentVersionService";

interface Props {
  productId: number;
  version1Id: number;
  version2Id: number;
  onClose: () => void;
}

const VersionComparisonModal = ({
  productId,
  version1Id,
  version2Id,
  onClose,
}: Props) => {
  const [comparison, setComparison] = useState<CompareResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComparison();
  }, [productId, version1Id, version2Id]);

  const fetchComparison = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ContentVersionService.compareVersions(
        productId,
        version1Id,
        version2Id,
      );
      setComparison(data);
    } catch (err) {
      setError((err as Error).message || "Failed to compare versions");
    } finally {
      setLoading(false);
    }
  };

  const renderDiff = (text1: string, text2: string) => {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");

    return (
      <div className="row g-2" style={{ height: "500px", overflowY: "auto" }}>
        <div className="col-6">
          <div className="small fw-semibold text-muted mb-2">
            Version {comparison?.version1.version_number}
          </div>
          <div
            className="bg-light p-2 rounded border border-danger-subtle"
            style={{
              fontSize: "0.75rem",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              height: "100%",
              overflowY: "auto",
            }}
          >
            {lines1.map((line, idx) => (
              <div key={idx} className="text-danger-emphasis">
                {line}
              </div>
            ))}
          </div>
        </div>
        <div className="col-6">
          <div className="small fw-semibold text-muted mb-2">
            Version {comparison?.version2.version_number}
          </div>
          <div
            className="bg-light p-2 rounded border border-success-subtle"
            style={{
              fontSize: "0.75rem",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              height: "100%",
              overflowY: "auto",
            }}
          >
            {lines2.map((line, idx) => (
              <div key={idx} className="text-success-emphasis">
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="modal-backdrop show" onClick={onClose}></div>
      <div
        className="modal show d-block"
        tabIndex={-1}
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header bg-light d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <h5 className="modal-title fw-bold mb-0">Compare Versions</h5>
                <ArrowRightLeft size={18} className="text-muted" />
              </div>
              <button
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {loading ? (
                <div className="d-flex align-items-center justify-content-center py-5">
                  <Loader size={24} className="spinner-border text-primary" />
                  <span className="ms-2">Comparing versions...</span>
                </div>
              ) : error ? (
                <div
                  className="alert alert-danger d-flex align-items-center gap-2"
                  role="alert"
                >
                  <AlertCircle size={20} />
                  <div>
                    <strong>Error:</strong> {error}
                  </div>
                </div>
              ) : comparison ? (
                <>
                  <div className="alert alert-info small mb-3">
                    <strong>Left side (Red):</strong> Version{" "}
                    {comparison.version1.version_number}
                    <br />
                    <strong>Right side (Green):</strong> Version{" "}
                    {comparison.version2.version_number}
                  </div>
                  {renderDiff(
                    comparison.version1.html,
                    comparison.version2.html,
                  )}
                </>
              ) : null}
            </div>

            <div className="modal-footer bg-light">
              <button className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VersionComparisonModal;

import { useEffect, useState } from "react";
import { Loader, AlertCircle, Copy, Check } from "lucide-react";
import {
  ContentVersionService,
  type VersionDetail,
} from "../../../service/contentVersionService";

interface Props {
  productId: number;
  versionId: number;
  onClose: () => void;
}

const VersionDetailModal = ({ productId, versionId, onClose }: Props) => {
  const [version, setVersion] = useState<VersionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchVersionDetail();
  }, [productId, versionId]);

  const fetchVersionDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ContentVersionService.getVersionDetail(
        productId,
        versionId,
      );
      setVersion(data);
    } catch (err) {
      setError((err as Error).message || "Failed to load version detail");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (version?.html) {
      navigator.clipboard.writeText(version.html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="modal-backdrop show" onClick={onClose}></div>
      <div
        className="modal show d-block"
        tabIndex={-1}
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header bg-light d-flex justify-content-between align-items-center">
              <div>
                <h5 className="modal-title fw-bold mb-0">Version Details</h5>
                {version && (
                  <small className="text-muted">
                    Version {version.version_number}
                    {version.is_draft && (
                      <span className="badge bg-warning text-dark ms-2">
                        Draft
                      </span>
                    )}
                    {version.is_published && (
                      <span className="badge bg-success ms-2">Published</span>
                    )}
                  </small>
                )}
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
                  <span className="ms-2">Loading version detail...</span>
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
              ) : version ? (
                <>
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-muted small">
                      Created At
                    </label>
                    <p className="text-dark">
                      {new Date(version.created_at).toLocaleString()}
                    </p>
                  </div>

                  {version.change_note && (
                    <div className="mb-3">
                      <label className="form-label fw-semibold text-muted small">
                        Change Note
                      </label>
                      <p className="text-dark bg-light p-2 rounded">
                        {version.change_note}
                      </p>
                    </div>
                  )}

                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="form-label fw-semibold text-muted small">
                        HTML Content
                      </label>
                      <button
                        className={`btn btn-sm ${
                          copied ? "btn-success" : "btn-outline-secondary"
                        }`}
                        onClick={handleCopy}
                      >
                        {copied ? (
                          <>
                            <Check size={14} className="me-1" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={14} className="me-1" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <div
                      className="bg-light p-3 rounded border border-secondary-subtle"
                      style={{
                        maxHeight: "400px",
                        overflowY: "auto",
                        fontFamily: "monospace",
                        fontSize: "0.85rem",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {version.html || (
                        <span className="text-muted">No content</span>
                      )}
                    </div>
                  </div>

                  <div className="alert alert-info small">
                    <strong>Preview:</strong> The content above is the raw HTML.
                    This will be rendered on the frontend.
                  </div>
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

export default VersionDetailModal;

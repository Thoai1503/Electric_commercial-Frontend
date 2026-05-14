import { useEffect, useState } from "react";
import {
  Clock,
  Check,
  Trash2,
  RefreshCw,
  ChevronDown,
  AlertCircle,
  Loader,
} from "lucide-react";
import {
  ContentVersionService,
  type VersionsList,
} from "../../../service/contentVersionService";

interface Props {
  productId: number;
  onVersionSelect?: (versionId: number) => void;
}

const ContentVersionsList = ({ productId, onVersionSelect }: Props) => {
  const [versions, setVersions] = useState<VersionsList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedVersion, setExpandedVersion] = useState<number | null>(null);
  const [deletingVersion, setDeletingVersion] = useState<number | null>(null);
  const [publishing, setPublishing] = useState<number | null>(null);
  const [restoring, setRestoring] = useState<number | null>(null);

  useEffect(() => {
    fetchVersions();
  }, [productId]);

  const fetchVersions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ContentVersionService.getVersionsList(productId);
      setVersions(data);
    } catch (err) {
      setError((err as Error).message || "Failed to load versions");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (versionId: number) => {
    if (!window.confirm("Publish this version?")) return;
    try {
      setPublishing(versionId);
      await ContentVersionService.publishVersion(productId, versionId);
      await fetchVersions();
      alert("Version published successfully");
    } catch (err) {
      alert((err as Error).message || "Failed to publish version");
    } finally {
      setPublishing(null);
    }
  };

  const handleRestore = async (versionId: number) => {
    if (!window.confirm("Restore this version?")) return;
    try {
      setRestoring(versionId);
      await ContentVersionService.restoreVersion(productId, versionId);
      await fetchVersions();
      alert("Version restored successfully");
    } catch (err) {
      alert((err as Error).message || "Failed to restore version");
    } finally {
      setRestoring(null);
    }
  };

  const handleDelete = async (versionId: number) => {
    if (!window.confirm("Delete this version? This action cannot be undone."))
      return;
    try {
      setDeletingVersion(versionId);
      await ContentVersionService.deleteVersion(productId, versionId);
      await fetchVersions();
      alert("Version deleted successfully");
    } catch (err) {
      alert((err as Error).message || "Failed to delete version");
    } finally {
      setDeletingVersion(null);
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center py-5">
        <Loader size={24} className="spinner-border text-primary" />
        <span className="ms-2">Loading versions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="alert alert-danger d-flex align-items-center gap-2"
        role="alert"
      >
        <AlertCircle size={20} />
        <div>
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  if (!versions || versions.versions.length === 0) {
    return (
      <div className="alert alert-info text-center py-5">
        <p className="mb-0">No versions found for this product</p>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h6 className="mb-0 fw-bold">Content Versions</h6>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={fetchVersions}
          disabled={loading}
        >
          <RefreshCw size={14} className="me-1" />
          Refresh
        </button>
      </div>
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {versions.versions.map((version) => (
            <div
              key={version.id}
              className="list-group-item border-bottom-0"
              style={{ borderBottom: "1px solid #dee2e6" }}
            >
              <div
                className="d-flex justify-content-between align-items-start gap-2 cursor-pointer"
                onClick={() =>
                  setExpandedVersion(
                    expandedVersion === version.id ? null : version.id,
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <h6 className="mb-0 fw-semibold">
                      Version {version.version_number}
                    </h6>
                    {version.is_draft && (
                      <span className="badge bg-warning text-dark">Draft</span>
                    )}
                    {version.is_published && (
                      <span className="badge bg-success">Published</span>
                    )}
                  </div>
                  <small className="text-muted d-flex align-items-center gap-1">
                    <Clock size={14} />
                    {new Date(version.created_at).toLocaleString()}
                  </small>
                  {version.change_note && (
                    <p className="mb-0 mt-2 text-secondary small">
                      {version.change_note}
                    </p>
                  )}
                </div>
                <ChevronDown
                  size={18}
                  className={`text-muted transition-transform ${
                    expandedVersion === version.id ? "rotate" : ""
                  }`}
                  style={{
                    transform:
                      expandedVersion === version.id
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                  }}
                />
              </div>

              {expandedVersion === version.id && (
                <div className="mt-3 pt-3 border-top">
                  <div className="btn-group w-100 d-flex gap-2" role="group">
                    <button
                      className="btn btn-sm btn-outline-primary flex-grow-1"
                      onClick={() => onVersionSelect?.(version.id)}
                      disabled={version.is_draft || version.is_published}
                    >
                      View
                    </button>

                    {!version.is_published && (
                      <button
                        className="btn btn-sm btn-outline-success flex-grow-1"
                        onClick={() => handlePublish(version.id)}
                        disabled={publishing === version.id}
                      >
                        {publishing === version.id ? (
                          <Loader size={14} className="spinner-border me-1" />
                        ) : (
                          <Check size={14} className="me-1" />
                        )}
                        Publish
                      </button>
                    )}

                    {!version.is_draft && (
                      <button
                        className="btn btn-sm btn-outline-info flex-grow-1"
                        onClick={() => handleRestore(version.id)}
                        disabled={restoring === version.id}
                      >
                        {restoring === version.id ? (
                          <Loader size={14} className="spinner-border me-1" />
                        ) : (
                          <RefreshCw size={14} className="me-1" />
                        )}
                        Restore
                      </button>
                    )}

                    {!version.is_draft && !version.is_published && (
                      <button
                        className="btn btn-sm btn-outline-danger flex-grow-1"
                        onClick={() => handleDelete(version.id)}
                        disabled={deletingVersion === version.id}
                      >
                        {deletingVersion === version.id ? (
                          <Loader size={14} className="spinner-border me-1" />
                        ) : (
                          <Trash2 size={14} className="me-1" />
                        )}
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentVersionsList;

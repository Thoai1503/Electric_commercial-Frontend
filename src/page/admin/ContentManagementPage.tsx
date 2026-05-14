import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, AlertCircle, Loader } from "lucide-react";
import ContentManagementSection from "../../components/admin/content_management/ContentManagementSection";

interface ProductBasicInfo {
  id: number;
  name: string;
  slug: string;
}

const ContentManagementPage = () => {
  const { productId } = useParams<{ productId: string }>();
  //alert(productId);
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductBasicInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/product/${productId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch product");
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError((err as Error).message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="text-center">
          <Loader size={48} className="spinner-border text-primary mb-3" />
          <p className="text-muted">Loading content management...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div
          className="alert alert-danger d-flex gap-2 align-items-start"
          role="alert"
        >
          <AlertCircle size={24} />
          <div>
            <h5 className="alert-heading">Error</h5>
            <p className="mb-0">{error}</p>
          </div>
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/admin/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">Product not found</div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Breadcrumb */}
      <div className="row mb-4">
        <div className="col-12">
          <button
            className="btn btn-link text-decoration-none p-0 d-flex align-items-center gap-2 mb-3"
            onClick={() => navigate("/admin/products")}
          >
            <ArrowLeft size={18} />
            Back to Products
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="row">
        <div className="col-12">
          <ContentManagementSection
            productId={product.id}
            productName={product.name}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentManagementPage;

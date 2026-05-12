import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verifyEmailTokenService } from "../../service/user";
import {
  CheckCircle2,
  LoaderCircle,
  MailWarning,
  TriangleAlert,
} from "lucide-react";

type VerifyState = "loading" | "success" | "error" | "missing-token";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<VerifyState>("loading");
  const [message, setMessage] = useState<string>("Dang xac thuc email...");

  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);

  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      if (!token) {
        setState("missing-token");
        setMessage("Khong tim thay token xac thuc trong duong dan.");
        return;
      }

      try {
        const response = await verifyEmailTokenService(token);
        if (cancelled) return;

        if (response.success) {
          setState("success");
          setMessage(
            response.message ||
              "Xac thuc email thanh cong. Ban co the dang nhap ngay.",
          );
        } else {
          setState("error");
          setMessage(
            response.message || "Xac thuc email that bai. Vui long thu lai.",
          );
        }
      } catch (error: any) {
        if (cancelled) return;

        const apiMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Token khong hop le hoac da het han.";

        setState("error");
        setMessage(apiMessage);
      }
    };

    void verify();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5 px-3 bg-light">
      <div
        className="card border-0 shadow-lg rounded-4 p-4 p-md-5"
        style={{ maxWidth: 560, width: "100%" }}
      >
        <div className="text-center">
          {state === "loading" && (
            <>
              <LoaderCircle className="mx-auto mb-3 text-primary" size={52} />
              <h3 className="fw-bold mb-3">Dang xac thuc email</h3>
            </>
          )}

          {state === "success" && (
            <>
              <CheckCircle2 className="mx-auto mb-3 text-success" size={52} />
              <h3 className="fw-bold mb-3">Xac thuc thanh cong</h3>
            </>
          )}

          {state === "missing-token" && (
            <>
              <MailWarning className="mx-auto mb-3 text-warning" size={52} />
              <h3 className="fw-bold mb-3">Thieu token xac thuc</h3>
            </>
          )}

          {state === "error" && (
            <>
              <TriangleAlert className="mx-auto mb-3 text-danger" size={52} />
              <h3 className="fw-bold mb-3">Xac thuc that bai</h3>
            </>
          )}

          <p className="text-secondary mb-4">{message}</p>

          <div className="d-flex justify-content-center gap-2 flex-wrap">
            <Link to="/login" className="btn btn-primary px-4">
              Dang nhap
            </Link>
            <Link to="/" className="btn btn-outline-secondary px-4">
              Ve trang chu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

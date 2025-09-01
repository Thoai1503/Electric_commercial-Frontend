import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const AuthDebug = () => {
  const [localStorageData, setLocalStorageData] = useState<any>({});
  const authState = useSelector((state: RootState) => state.authen);
  const [isOpen, setOpen] = useState<boolean>(true);

  useEffect(() => {
    // Get all localStorage data
    const data = {
      accessToken: localStorage.getItem("accessToken"),
      token: localStorage.getItem("token"),
      refreshToken: localStorage.getItem("refreshToken"),
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null,
    };
    setLocalStorageData(data);
  }, []);

  const refreshData = () => {
    console.log("Refresh");
    const data = {
      accessToken: localStorage.getItem("accessToken"),
      token: localStorage.getItem("token"),
      refreshToken: localStorage.getItem("refreshToken"),
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null,
    };
    setLocalStorageData(data);
  };

  return (
    <div
      style={{
        display: isOpen ? "block" : "none",
        position: "fixed",
        top: "100px",
        right: "20px",
        background: "white",
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px",
        maxWidth: "400px",
        zIndex: 1000,
        fontSize: "12px",
      }}
    >
      <h4 style={{ margin: "0 0 10px 0" }}>🔍 Auth Debug</h4>

      <div style={{ marginBottom: "10px" }}>
        <strong>Redux State:</strong>
        <pre style={{ fontSize: "10px", margin: "5px 0" }}>
          {JSON.stringify(authState, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <strong>LocalStorage:</strong>
        <pre style={{ fontSize: "10px", margin: "5px 0" }}>
          {JSON.stringify(localStorageData, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <strong>Admin Check:</strong>
        <div>Role: {localStorageData.user?.role || "N/A"}</div>
        <div>Rule: {localStorageData.user?.rule || "N/A"}</div>
        <div>
          Is Admin:{" "}
          {localStorageData.user?.role === 1 ||
          localStorageData.user?.rule === 1
            ? "✅ YES"
            : "❌ NO"}
        </div>
      </div>

      <button
        onClick={refreshData}
        style={{
          background: "#007bff",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Refresh
      </button>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "#656768ff",
          color: "white",
          border: "none",
          margin: "5px",
          padding: "5px 10px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  );
};

export default AuthDebug;

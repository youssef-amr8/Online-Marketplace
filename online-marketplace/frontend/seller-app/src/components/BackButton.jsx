import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        padding: "10px 18px",
        background: "linear-gradient(135deg, #0d6efd, #5aa9ff)",
        color: "#fff",
        border: "none",
        borderRadius: "14px",
        cursor: "pointer",
        marginBottom: "24px",
        fontSize: "14px",
        fontWeight: 600,
        boxShadow: "0 8px 18px rgba(13,110,253,0.25)",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      ← Back
    </button>
  );
}

export default BackButton;

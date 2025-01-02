import React from "react";

interface ResultPreviewProps {
  tailoredResume: string;
  onReset: () => void;
}

const ResultPreview: React.FC<ResultPreviewProps> = ({ tailoredResume, onReset }) => {
  const handleDownload = () => {
    const blob = new Blob([tailoredResume], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tailored_resume.tex";
    link.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(tailoredResume).then(() => {
      alert("LaTeX code copied to clipboard!");
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Tailored Resume Preview</h2>
      <pre style={styles.preview}>{tailoredResume}</pre>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleDownload}>
          Download Tailored Resume
        </button>
        <button style={styles.copyButton} onClick={handleCopy}>
          📋 Copy LaTeX Code
        </button>
        <button style={styles.button} onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "20px",
  },
  preview: {
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#fff",
    color: "#444",
    maxHeight: "400px",
    overflowY: "auto",
    fontSize: "1rem",
    lineHeight: "1.5",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  copyButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
};

export default ResultPreview;

"use client";

import React, { useState } from "react";
import ResumeForm from "../components/ResumeForm";
import ResultPreview from "../components/ResultPreview";

const FresumeePage: React.FC = () => {
  // State to manage tailored resume content
  const [tailoredResume, setTailoredResume] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form submission with FormData
  const handleFormSubmit = async (formData: FormData): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch("/api/resumee", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process the resume.");
      }
 console.log(response);
      const result = await response.text();
      console.log(result);
      setTailoredResume(result);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form to initial state
  const resetForm = (): void => {
    setTailoredResume(null);
    setError(null);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}
      {!tailoredResume ? (
        <ResumeForm onSubmit={handleFormSubmit} />
      ) : (
        <ResultPreview tailoredResume={tailoredResume} onReset={resetForm} />
      )}
    </div>
  );
};

export default FresumeePage;

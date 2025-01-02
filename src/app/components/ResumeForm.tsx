import React, { FormEvent, useState } from "react";
import styled, { keyframes } from "styled-components";

// Styled components for modern UI
const FormContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: #333333;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #555555;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #cccccc;
  border-radius: 5px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #cccccc;
  border-radius: 5px;
  resize: none;
  min-height: 150px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 12px;
  font-size: 1.1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const FooterText = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #666666;
`;

const ErrorText = styled.p`
  color: #ff0000;
  font-size: 0.9rem;
  margin: 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333333;
`;

const ModalText = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
  color: #555555;
`;

const CloseButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

interface ResumeFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ onSubmit }) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPremiumPopup, setShowPremiumPopup] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (
      file &&
      file.type !== "application/x-tex" &&
      !file.name.endsWith(".tex")
    ) {
      setError("Only LaTeX (.tex) files are allowed.");
      setResumeFile(null);
      return;
    }
    setError("");
    setResumeFile(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!resumeFile || jobDescription.trim() === "") {
      setError("Please upload a resume and provide a job description.");
      return;
    }

    // Show the premium popup instead of submitting
    setShowPremiumPopup(true);
  };

  const closeModal = () => {
    setShowPremiumPopup(false);
  };

  return (
    <FormContainer>
      <Title>Tailor Your Resume</Title>
      {error && <ErrorText>{error}</ErrorText>}
      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="resume">Upload Resume (.tex):</Label>
          <Input
            type="file"
            id="resume"
            accept=".tex"
            onChange={handleFileChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="jobDescription">Paste Job Description:</Label>
          <TextArea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description here"
            required
          />
        </FormGroup>
        <SubmitButton type="submit">Tailor Resume</SubmitButton>
      </StyledForm>
      <FooterText>
        Upload your LaTeX resume and tailor it to match the job description.
      </FooterText>

      {showPremiumPopup && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Premium Required</ModalTitle>
            <ModalText>
              This feature requires a premium subscription. Please upgrade to
              access this functionality.
            </ModalText>
            <CloseButton onClick={closeModal}>Close</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </FormContainer>
  );
};

export default ResumeForm;

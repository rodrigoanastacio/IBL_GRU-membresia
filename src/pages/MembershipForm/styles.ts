import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  background-color: #f9fafb;
  min-height: 100vh;

  @media (max-width: 640px) {
    padding: 0;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 48rem;
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Row = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;

  @media (max-width: 640px) {
    flex-direction: column;
  }

  & > * {
    flex: 1;
  }
`;

export const SubmitButton = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
  margin-top: 1rem;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
`;

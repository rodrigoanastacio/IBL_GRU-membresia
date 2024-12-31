import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  color: #374151;
`;

export const InputField = styled.input`
  height: 2.75rem;
  padding: 0 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  width: 100%;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 1px #2563eb;
  }
`;

export const ErrorMessage = styled.span`
  color: #dc2626;
  font-size: 0.75rem;
`;
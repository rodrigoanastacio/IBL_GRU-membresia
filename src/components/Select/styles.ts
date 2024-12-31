import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const Required = styled.span`
  color: #ef4444;
`;

interface SelectProps {
  hasError?: boolean;
}

export const SelectField = styled.select<SelectProps>`
  width: 100%;
  height: 2.75rem;
  padding: 0 0.75rem;
  border-radius: 0.375rem;
  border: 2px solid ${({ hasError }) => (hasError ? '#ef4444' : '#d1d5db')};
  font-size: 0.875rem;
  color: #374151;
  transition: all 0.2s;
  background-color: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;

  &:hover {
    border-color: ${({ hasError }) => (hasError ? '#ef4444' : '#9ca3af')};
  }

  &:focus {
    outline: none;
    border-color: ${({ hasError }) => (hasError ? '#ef4444' : '#2563eb')};
    box-shadow: ${({ hasError }) =>
      hasError
        ? '0 0 0 1px #ef4444'
        : '0 0 0 1px #2563eb'};
  }

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: #ef4444;
`;
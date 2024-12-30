import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  color: #374151;
`;

export const CheckboxField = styled.input`
  width: 1rem;
  height: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  
  &:checked {
    background-color: #2563eb;
    border-color: #2563eb;
  }
`;
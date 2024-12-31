import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

export const OptionsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

interface OptionProps {
  selected: boolean;
}

export const Option = styled.label<OptionProps>`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${({ selected }) => (selected ? "#e0f2fe" : "#f9fafb")};
  border: 2px solid ${({ selected }) => (selected ? "#0ea5e9" : "#e5e7eb")};

  &:hover {
    background-color: ${({ selected }) => (selected ? "#e0f2fe" : "#f3f4f6")};
  }

  input[type="radio"] {
    display: none;
  }
`;

export const Radio = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CustomRadio = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 2px solid #9ca3af;
  position: relative;
  transition: all 0.2s;

  input:checked + & {
    border-color: #0ea5e9;

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0.625rem;
      height: 0.625rem;
      border-radius: 50%;
      background-color: #0ea5e9;
    }
  }
`;

export const OptionLabel = styled.span`
  font-size: 0.875rem;
  color: #374151;
`;

export const Error = styled.span`
  font-size: 0.75rem;
  color: #ef4444;
`;

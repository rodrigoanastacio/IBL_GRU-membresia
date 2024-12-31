import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

interface InputContainerProps {
  isFocused: boolean;
  hasError: boolean;
}

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  height: 2.75rem;
  padding: 0 0.75rem;
  border-radius: 0.375rem;
  border: 2px solid ${({ hasError, isFocused }) => 
    hasError ? '#ef4444' : 
    isFocused ? '#2563eb' : 
    '#d1d5db'
  };
  background-color: white;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: ${({ hasError }) => hasError ? '#ef4444' : '#2563eb'};
  }

  svg {
    color: #6b7280;
    flex-shrink: 0;
  }
`;

export const Input = styled.input`
  border: none;
  background: none;
  padding: 0;
  width: 100%;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
  }
`;

export const Error = styled.span`
  font-size: 0.75rem;
  color: #ef4444;
`;

// Estilos globais para o DatePicker
export const GlobalDatePickerStyles = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker {
    font-family: inherit;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }

  .react-datepicker__header {
    background-color: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    padding-top: 0.5rem;
  }

  .react-datepicker__current-month {
    font-weight: 600;
    color: #374151;
  }

  .react-datepicker__day-name {
    color: #6b7280;
  }

  .react-datepicker__day {
    color: #374151;
    border-radius: 0.375rem;
    transition: all 0.2s;

    &:hover {
      background-color: #e0f2fe;
    }
  }

  .react-datepicker__day--selected {
    background-color: #2563eb;
    color: white;

    &:hover {
      background-color: #1d4ed8;
    }
  }

  .react-datepicker__day--keyboard-selected {
    background-color: #e0f2fe;
    color: #374151;
  }

  .react-datepicker__day--outside-month {
    color: #9ca3af;
  }

  .react-datepicker__navigation {
    top: 0.5rem;
  }

  .react-datepicker__year-dropdown {
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    max-height: 200px;
    overflow-y: auto;
  }

  .react-datepicker__year-option {
    padding: 0.5rem;
    transition: all 0.2s;

    &:hover {
      background-color: #e0f2fe;
    }
  }

  .react-datepicker__triangle {
    display: none;
  }
`;

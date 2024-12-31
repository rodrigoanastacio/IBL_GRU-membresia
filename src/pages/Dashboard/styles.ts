import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  width: 100%;
  max-width: 400px;
  color: #6b7280;

  &:focus-within {
    border-color: #2563eb;
    box-shadow: 0 0 0 1px #2563eb;
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 0.875rem;
  color: #111827;

  &::placeholder {
    color: #9ca3af;
  }
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);

  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  th {
    background-color: #f9fafb;
    font-weight: 500;
    color: #374151;
    font-size: 0.875rem;
  }

  td {
    color: #111827;
    font-size: 0.875rem;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background-color: #f9fafb;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    color: #111827;
    background-color: #f3f4f6;
  }
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const PaginationButton = styled.button<{ disabled?: boolean }>`
  background: none;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ disabled }) => (disabled ? "#d1d5db" : "#374151")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;

  &:not(:disabled):hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }
`;

export const PageInfo = styled.span`
  font-size: 0.875rem;
  color: #374151;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-size: 0.875rem;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;

  h2 {
    font-size: 1.25rem;
    color: #1f2937;
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;

  &:hover {
    color: #1f2937;
  }
`;

export const DetailGroup = styled.div`
  margin-bottom: 1rem;
`;

export const DetailLabel = styled.div`
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

export const DetailValue = styled.div`
  color: #4b5563;
`;

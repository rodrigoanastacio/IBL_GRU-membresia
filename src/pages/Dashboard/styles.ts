import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Title = styled.h1`
  color: #1f2937;
  font-size: 1.875rem;
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

  svg {
    color: #6b7280;
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 0.875rem;

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Table = styled.table`
  width: 100%;
  background-color: white;
  border-radius: 0.5rem;
  border-collapse: collapse;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  th {
    background-color: #f9fafb;
    font-weight: 600;
    color: #374151;
  }

  td {
    color: #4b5563;
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
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s;

  &:hover {
    color: #2563eb;
    background-color: #eff6ff;
  }
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

export const PaginationButton = styled.button`
  background: white;
  border: 1px solid #e5e7eb;
  padding: 0.5rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #f9fafb;
    border-color: #d1d5db;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PageInfo = styled.span`
  color: #4b5563;
  font-size: 0.875rem;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  color: #6b7280;
  padding: 2rem;
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

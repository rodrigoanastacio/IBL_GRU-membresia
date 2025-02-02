import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const Subtitle = styled.p`
  color: #6b7280;
  margin: 0.25rem 0 0 0;
`;

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 400px;
  color: #6b7280;

  svg {
    flex-shrink: 0;
  }
`;

export const SearchInput = styled.input`
  border: none;
  background: none;
  padding: 0;
  font-size: 0.875rem;
  color: #111827;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const LogoutButton = styled.button`
  background-color: #0284c7;
  color: #e5e7eb;
  padding: 16px 24px;
  border: none;
  border-radius: 0.5rem;
`;

export const CleanupButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    color: #dc2626;
    background-color: #fee2e2;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

export const TableContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const TableHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const TableTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const TableDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0.25rem 0 0 0;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  min-width: 800px;

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
      &:not(:first-child):not(:last-child) {
        max-width: 150px;
      }
    }
  }

  th {
    background-color: #f9fafb;
    font-weight: 500;
    color: #374151;
    font-size: 0.875rem;
    white-space: nowrap;
    position: sticky;
    top: 0;
    z-index: 1;
    background-clip: padding-box;
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

export const MemberName = styled.div`
  font-weight: 500;
  color: #111827;
`;

interface StatusBadgeProps {
  active: boolean;
}

export const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ active }) => (active ? "#dcfce7" : "#fee2e2")};
  color: ${({ active }) => (active ? "#16a34a" : "#dc2626")};
`;

export const DocumentBadges = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const DocumentBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: #e0f2fe;
  color: #0284c7;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
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
  border-radius: 0.5rem;
  transition: all 0.2s;

  &:hover {
    color: #111827;
    background-color: #f3f4f6;
  }

  &.delete {
    &:hover {
      color: #dc2626;
      background-color: #fee2e2;
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

export const PaginationButton = styled.button<{ disabled?: boolean }>`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
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

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

export const LoadingMessage = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
`;

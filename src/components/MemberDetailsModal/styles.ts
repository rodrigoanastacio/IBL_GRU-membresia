import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Container = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

export const Header = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 11;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const Subtitle = styled.h3`
  font-size: 1rem;
  color: #4b5563;
  margin: 0 0 1.5rem 0;
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
  transition: all 0.2s;
  border-radius: 0.375rem;

  &:hover {
    color: #111827;
    background-color: #f3f4f6;
  }
`;

export const CloseButton = styled(ActionButton)``;

export const Content = styled.div`
  padding: 1.5rem;
  background-color: white;
`;

export const DetailsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

export const DetailItem = styled.div`
  display: grid;
  gap: 0.25rem;
`;

export const DetailNumber = styled.span`
  color: #3b82f6;
  font-weight: 500;
`;

export const DetailLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

export const DetailValue = styled.span`
  font-size: 1rem;
  color: #111827;
`;

export const DocumentLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

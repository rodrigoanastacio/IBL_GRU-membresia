import styled from "styled-components";

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
  width: 100%;
  max-width: 800px;
  min-height: 100vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);

  @media (min-width: 768px) {
    min-height: 90vh;
  }
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

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const CloseButton = styled.button`
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

export const Body = styled.div`
  padding: 1.5rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BoxMessage = styled.div`
  /* padding: 0 2rem; */
  width: 60%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > p {
    color: #6b7280;
  }
`;

export const WhatsAppLink = styled.a`
  background-color: #25d366;
  color: white;
  padding: 4px;
  border-radius: 0.375rem;
  font-weight: bold;
  transition: all 0.2s;
  text-decoration: none;

  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    background-color: #128c7e;
  }
`;

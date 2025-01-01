import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translate(-50%, -48%) scale(0.96);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
`;

export const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 400px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${slideIn} 0.2s ease-out;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
`;

export const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 1rem;
  background-color: #fee2e2;
  color: #dc2626;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const Content = styled.div`
  text-align: center;
`;

export const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem 0;
`;

export const Message = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;

  @media (max-width: 640px) {
    flex-direction: column-reverse;
  }
`;

const BaseButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled(BaseButton)`
  background-color: white;
  border: 1px solid #e5e7eb;
  color: #374151;

  &:not(:disabled):hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }
`;

export const ConfirmButton = styled(BaseButton)`
  background-color: #dc2626;
  border: 1px solid #dc2626;
  color: white;

  &:not(:disabled):hover {
    background-color: #b91c1c;
    border-color: #b91c1c;
  }
`;

export const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

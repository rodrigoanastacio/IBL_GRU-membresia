import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const CepContainer = styled.div`
  position: relative;
  width: 200px;
`;

export const LoadingIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 38px;
  color: #6b7280;

  svg {
    animation: ${spin} 1s linear infinite;
  }
`;

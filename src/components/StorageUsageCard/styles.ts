import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Container = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

interface IconContainerProps {
  isNearLimit: boolean;
}

export const IconContainer = styled.div<IconContainerProps>`
  width: 48px;
  height: 48px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isNearLimit }) => isNearLimit ? '#fee2e2' : '#e0f2fe'};
  color: ${({ isNearLimit }) => isNearLimit ? '#ef4444' : '#0284c7'};
  transition: all 0.2s;
`;

export const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProgressContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #f3f4f6;
  border-radius: 9999px;
  overflow: hidden;
`;

interface ProgressBarProps {
  percentage: number;
  isNearLimit: boolean;
}

export const ProgressBar = styled.div<ProgressBarProps>`
  height: 100%;
  width: ${({ percentage }) => `${percentage}%`};
  background-color: ${({ isNearLimit }) => isNearLimit ? '#ef4444' : '#0284c7'};
  border-radius: 9999px;
  transition: all 0.3s ease;
`;

export const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
`;

export const StatLabel = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

interface StatValueProps {
  isNearLimit?: boolean;
}

export const StatValue = styled.span<StatValueProps>`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ isNearLimit }) => isNearLimit ? '#ef4444' : '#111827'};
`;

export const StatDivider = styled.div`
  width: 1px;
  height: 2rem;
  background-color: #e5e7eb;
`;

export const WarningMessage = styled.div`
  padding: 0.75rem;
  background-color: #fee2e2;
  border-radius: 0.5rem;
  color: #991b1b;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  margin: 2rem auto;
`;

export const ErrorMessage = styled.div`
  color: #991b1b;
  text-align: center;
  padding: 1rem;
`;

import styled from "styled-components";

const colors = {
  blue: {
    bg: "#e0f2fe",
    text: "#0284c7",
  },
  green: {
    bg: "#dcfce7",
    text: "#16a34a",
  },
  yellow: {
    bg: "#fef3c7",
    text: "#d97706",
  },
  red: {
    bg: "#fee2e2",
    text: "#dc2626",
  },
};

export const Container = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

interface IconContainerProps {
  color: keyof typeof colors;
}

export const IconContainer = styled.div<IconContainerProps>`
  width: 48px;
  height: 48px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => colors[color].bg};
  color: ${({ color }) => colors[color].text};
  flex-shrink: 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

export const Title = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

export const Value = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

export const Description = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

interface TrendProps {
  isPositive: boolean;
}

export const Trend = styled.span<TrendProps>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ isPositive }) => (isPositive ? "#16a34a" : "#dc2626")};
  padding: 0.25rem 0.5rem;
  background-color: ${({ isPositive }) => (isPositive ? "#dcfce7" : "#fee2e2")};
  border-radius: 9999px;
`;

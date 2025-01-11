import { LucideIcon } from "lucide-react";
import * as S from "./styles";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: LucideIcon;
  color?: "blue" | "green" | "yellow" | "red";
}

export function StatsCard({
  title,
  value,
  description,
  trend,
  icon: Icon,
  color = "blue",
}: StatsCardProps) {
  return (
    <S.Container>
      <S.IconContainer color={color}>
        <Icon size={24} />
      </S.IconContainer>

      <S.Content>
        <S.Title>{title}</S.Title>
        <S.Value>{value}</S.Value>

        {(description || trend) && (
          <S.Footer>
            {description && <S.Description>{description}</S.Description>}
            {trend && (
              <S.Trend isPositive={trend.isPositive}>
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </S.Trend>
            )}
          </S.Footer>
        )}
      </S.Content>
    </S.Container>
  );
}

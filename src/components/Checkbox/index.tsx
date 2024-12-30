import { forwardRef, InputHTMLAttributes } from 'react';
import * as S from './styles';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => {
    return (
      <S.Container>
        <S.CheckboxField type="checkbox" ref={ref} {...props} />
        <S.Label>{label}</S.Label>
      </S.Container>
    );
  }
);

Checkbox.displayName = 'Checkbox';
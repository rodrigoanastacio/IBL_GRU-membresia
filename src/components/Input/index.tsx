import { forwardRef, InputHTMLAttributes } from 'react';
import * as S from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <S.Container>
        <S.Label>{label}</S.Label>
        <S.InputField ref={ref} {...props} />
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.Container>
    );
  }
);

Input.displayName = 'Input';
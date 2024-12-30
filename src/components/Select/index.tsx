import { forwardRef, SelectHTMLAttributes } from 'react';
import * as S from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, ...props }, ref) => {
    return (
      <S.Container>
        <S.Label>{label}</S.Label>
        <S.SelectField ref={ref} {...props}>
          <option value="">Selecione uma opção</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </S.SelectField>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.Container>
    );
  }
);

Select.displayName = 'Select';
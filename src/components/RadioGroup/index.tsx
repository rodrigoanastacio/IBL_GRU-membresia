import { InputHTMLAttributes } from 'react';
import * as S from './styles';

interface RadioOption {
  label: string;
  value: string | boolean;
}

interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label: string;
  options: RadioOption[];
  value: string | boolean;
  onChange: (value: string | boolean) => void;
  required?: boolean;
  error?: string;
}

export function RadioGroup({
  label,
  options,
  value,
  onChange,
  required,
  error,
  ...props
}: RadioGroupProps) {
  return (
    <S.Container>
      <S.Label>
        {label}
        {required && <S.Required>*</S.Required>}
      </S.Label>

      <S.OptionsContainer>
        {options.map((option) => (
          <S.Option
            key={option.label}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
          >
            <S.Radio>
              <input
                type="radio"
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                {...props}
              />
              <S.CustomRadio />
            </S.Radio>
            <S.OptionLabel>{option.label}</S.OptionLabel>
          </S.Option>
        ))}
      </S.OptionsContainer>

      {error && <S.Error>{error}</S.Error>}
    </S.Container>
  );
}

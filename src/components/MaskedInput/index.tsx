import { forwardRef, InputHTMLAttributes } from 'react';
import InputMask from 'react-input-mask';
import * as S from './styles';

interface MaskedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  mask: string;
  error?: string;
  required?: boolean;
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ label, mask, error, required, ...props }, ref) => {
    return (
      <S.Container>
        <S.Label>
          {label}
          {required && <S.Required>*</S.Required>}
        </S.Label>
        
        <InputMask
          mask={mask}
          maskChar={null}
          {...props}
        >
          {(inputProps: any) => (
            <S.Input
              ref={ref}
              hasError={!!error}
              {...inputProps}
            />
          )}
        </InputMask>

        {error && <S.Error>{error}</S.Error>}
      </S.Container>
    );
  }
);

import { forwardRef, InputHTMLAttributes } from 'react';
import * as S from './styles';

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <S.Container>
        <S.Label>{label}</S.Label>
        <S.InputField type="file" ref={ref} {...props} />
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.Container>
    );
  }
);

FileInput.displayName = 'FileInput';
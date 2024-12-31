import { forwardRef, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { Calendar } from 'lucide-react';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import * as S from './styles';

registerLocale('pt-BR', ptBR);

interface DatePickerProps {
  label: string;
  error?: string;
  value?: Date | null;
  onChange: (date: Date | null) => void;
  required?: boolean;
  maxDate?: Date;
  minDate?: Date;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, value, onChange, required, maxDate, minDate }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const CustomInput = forwardRef<HTMLInputElement>(({ value, onClick }: any, ref) => (
      <S.InputContainer onClick={onClick} isFocused={isFocused} hasError={!!error}>
        <Calendar size={20} />
        <S.Input ref={ref} value={value} readOnly />
      </S.InputContainer>
    ));

    return (
      <S.Container>
        <S.Label>
          {label}
          {required && <S.Required>*</S.Required>}
        </S.Label>

        <ReactDatePicker
          selected={value}
          onChange={onChange}
          locale="pt-BR"
          dateFormat="dd/MM/yyyy"
          customInput={<CustomInput ref={ref} />}
          maxDate={maxDate}
          minDate={minDate}
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          onCalendarOpen={() => setIsFocused(true)}
          onCalendarClose={() => setIsFocused(false)}
          placeholderText="Selecione uma data"
        />

        {error && <S.Error>{error}</S.Error>}
      </S.Container>
    );
  }
);

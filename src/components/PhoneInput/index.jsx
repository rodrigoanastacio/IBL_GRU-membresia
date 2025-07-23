import { IMaskInput } from "react-imask";
import "./styles.scss";

export const PhoneInput = ({ value, onChange, required, name = "contact" }) => {
  const handleAccept = (value) => {
    onChange({ target: { value, name } });
  };

  return (
    <IMaskInput
      mask="(00) 00000-0000"
      value={value}
      onAccept={handleAccept}
      className="c-phone-input"
      required={required}
      placeholder="(11) 99999-9999"
      unmask={false}
    />
  );
};

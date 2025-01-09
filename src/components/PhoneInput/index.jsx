import { IMaskInput } from "react-imask";
import "./styles.scss";

export const PhoneInput = ({ value, onChange, required }) => {
  const handleAccept = (value) => {
    onChange({ target: { value, name: "contact" } });
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

import { useState } from "react";
import "./styles.scss";

export const NewGC = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    leaders: "",
    contact: "",
    data: "",
    time: "",
    isOnline: false,
    isCouple: false,
    addressDetails: {
      street: "",
      number: "",
      neighborhood: "",
      city: "Guarulhos",
      state: "SP",
      country: "Brasil",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Clicou");
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        addressDetails: {
          ...prev.addressDetails,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  return (
    <div className="p-new-gc">
      <h1 className="p-new-gc__title">Novo GC</h1>

      <form onSubmit={handleSubmit} className="p-new-gc__form">
        <div className="p-new-gc__field">
          <label htmlFor="title">Nome do GC</label>
          <input type="text" id="title" name="title" required />
        </div>

        <div className="p-new-gc__field">
          <label htmlFor="leaders">Líderes</label>
          <input type="text" id="leaders" name="leaders" required />
        </div>

        <div className="p-new-gc__buttons">
          <button type="button" className="p-new-gc__cancel" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="p-new-gc__submit">
            Criar GC
          </button>
        </div>
      </form>
    </div>
  );
};

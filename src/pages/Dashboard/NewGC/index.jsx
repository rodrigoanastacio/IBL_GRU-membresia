import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneInput } from "../../../components/PhoneInput";
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
    const fullAddress = `${formData.addressDetails.number}, ${formData.addressDetails.street}, ${formData.addressDetails.neighborhood}, ${formData.addressDetails.city}, ${formData.addressDetails.state}, ${formData.addressDetails.country}`;
    console.log({ ...formData, address: fullAddress });
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
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="p-new-gc__field">
          <label htmlFor="leaders">Líderes</label>
          <input
            type="text"
            id="leaders"
            name="leaders"
            value={formData.leaders}
            onChange={handleChange}
            required
          />
        </div>

        <div className="p-new-gc__field">
          <label htmlFor="contact">Contato</label>
          <PhoneInput
            value={formData.contact}
            onChange={(e) => handleChange({ ...e, name: "contact" })}
            required
          />
        </div>

        <div className="p-new-gc__row">
          <div className="p-new-gc__field">
            <label htmlFor="data">Dia</label>
            <select
              id="data"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="Segunda">Segunda</option>
              <option value="Terça">Terça</option>
              <option value="Quarta">Quarta</option>
              <option value="Quinta">Quinta</option>
              <option value="Sexta">Sexta</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
            </select>
          </div>

          <div className="p-new-gc__field">
            <label htmlFor="time">Horário</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="p-new-gc__checkboxes">
          <label>
            <input
              type="checkbox"
              name="isOnline"
              checked={formData.isOnline}
              onChange={handleChange}
            />
            GC Online
          </label>

          <label>
            <input
              type="checkbox"
              name="isCouple"
              checked={formData.isCouple}
              onChange={handleChange}
            />
            GC de Casais
          </label>
        </div>

        <AnimatePresence>
          {!formData.isOnline && (
            <motion.fieldset
              className="p-new-gc__address"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <legend>Endereço</legend>

              <div className="p-new-gc__field">
                <label htmlFor="address.street">Rua</label>
                <input
                  type="text"
                  id="address.street"
                  name="address.street"
                  value={formData.addressDetails.street}
                  onChange={handleChange}
                  required={!formData.isOnline}
                />
              </div>

              <div className="p-new-gc__row">
                <div className="p-new-gc__field">
                  <label htmlFor="address.number">Número</label>
                  <input
                    type="text"
                    id="address.number"
                    name="address.number"
                    value={formData.addressDetails.number}
                    onChange={handleChange}
                    required={!formData.isOnline}
                  />
                </div>

                <div className="p-new-gc__field">
                  <label htmlFor="address.neighborhood">Bairro</label>
                  <input
                    type="text"
                    id="address.neighborhood"
                    name="address.neighborhood"
                    value={formData.addressDetails.neighborhood}
                    onChange={handleChange}
                    required={!formData.isOnline}
                  />
                </div>
              </div>
            </motion.fieldset>
          )}
        </AnimatePresence>

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

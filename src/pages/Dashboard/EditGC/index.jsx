import { useState, useEffect } from "react";
// import { items } from "../../../data/items";
// import { PhoneInput } from "../../../components/PhoneInput";
import "./styles.scss";

export const EditGC = ({ id, onClose }) => {
  const [formData, setFormData] = useState(null);

  // useEffect(() => {
  //   const gc = items.find((item) => item.id === id);
  //   if (gc) {
  //     setFormData(gc);
  //   }
  // }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("GC atualizado:", formData);
    onClose();
  };

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   if (name.startsWith("address.")) {
  //     const addressField = name.split(".")[1];
  //     setFormData((prev) => ({
  //       ...prev,
  //       addressDetails: {
  //         ...prev.addressDetails,
  //         [addressField]: value,
  //       },
  //     }));
  //   } else {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: type === "checkbox" ? checked : value,
  //     }));
  //   }
  // };

  if (!formData) return null;

  return (
    <div className="p-edit-gc">
      <h1 className="p-edit-gc__title">Editar GC</h1>

      <form className="p-edit-gc__form">
        <div className="p-edit-gc__field">
          <label htmlFor="title">Nome do GC</label>
          <input type="text" id="title" name="title" required />
        </div>

        <div className="p-edit-gc__field">
          <label htmlFor="leaders">Líderes</label>
          <input type="text" id="leaders" name="leaders" required />
        </div>

        {/* <div className="p-edit-gc__field">
          <label htmlFor="contact">Contato</label>
          <PhoneInput
            value={formData.contact}
            onChange={(e) => handleChange({ ...e, name: "contact" })}
            required
          />
        </div>

        <div className="p-edit-gc__row">
          <div className="p-edit-gc__field">
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

          <div className="p-edit-gc__field">
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

        <div className="p-edit-gc__checkboxes">
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

        {!formData.isOnline && (
          <fieldset className="p-edit-gc__address">
            <legend>Endereço</legend>

            <div className="p-edit-gc__field">
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

            <div className="p-edit-gc__row">
              <div className="p-edit-gc__field">
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

              <div className="p-edit-gc__field">
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
          </fieldset>
        )} */}

        <div className="p-edit-gc__buttons">
          <button
            type="button"
            className="p-edit-gc__cancel"
            onClick={() => onClose()}
          >
            Cancelar
          </button>
          <button type="submit" className="p-edit-gc__submit">
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};

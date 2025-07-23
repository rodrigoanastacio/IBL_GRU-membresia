import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneInput } from "../../../components/PhoneInput";
import { createGC } from "../../../services/gc";
import { MessageModal } from "../../../components/MessageModal";
import "./styles.scss";

export const NewGC = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    leaders: "", // Isso será mapeado para leader_name no backend
    leader_contact: "", // Campo de contato do líder principal (nome correto conforme Supabase)
    co_leader_name: "", // Nome do co-líder (com underscore para combinar com o Supabase)
    co_leader_contact: "", // Contato do co-líder (com underscore para combinar com o Supabase)
    weekday: "",
    time: "",
    is_online: false,
    is_couple: false,
    addressDetails: {
      street: "",
      number: "",
      neighborhood: "",
      city: "Guarulhos",
      state: "SP",
      country: "Brasil",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const fullAddress = !formData.is_online
        ? `${formData.addressDetails.number}, ${formData.addressDetails.street}, ${formData.addressDetails.neighborhood}, ${formData.addressDetails.city}, ${formData.addressDetails.state}, ${formData.addressDetails.country}`
        : null;

      // Preparar dados para o formato da tabela no Supabase
      const gcData = {
        title: formData.title,
        // Usamos leader_name em vez de leaders que não existe na tabela
        leader_name: formData.leaders, // Nome do líder principal
        leader_contact: formData.leader_contact, // Nome correto conforme Supabase
        // Precisamos manter o campo contact também, pois é obrigatório no banco
        contact: formData.leader_contact, // Usamos o mesmo valor do leader_contact
        // Dados do co-líder
        co_leader_name: formData.co_leader_name, // Nome correto conforme Supabase
        co_leader_contact: formData.co_leader_contact, // Nome correto conforme Supabase
        weekday: formData.weekday,
        time: formData.time,
        is_online: formData.is_online,
        is_couple: formData.is_couple,
        address: fullAddress,
        // Sempre incluir campos de endereço, mesmo para GCs online
        street: formData.is_online ? "N/A" : formData.addressDetails.street,
        number: formData.is_online ? "N/A" : formData.addressDetails.number,
        neighborhood: formData.is_online
          ? "N/A"
          : formData.addressDetails.neighborhood,
        city: formData.is_online ? "Guarulhos" : formData.addressDetails.city,
        state: formData.is_online ? "SP" : formData.addressDetails.state,
        country: formData.is_online
          ? "Brasil"
          : formData.addressDetails.country,
      };

      console.log("Enviando dados para criação:", gcData);
      const result = await createGC(gcData);

      console.log("GC criado com sucesso:", result);
      setSuccess(true);

      // Aguardar um pouco para mostrar a mensagem de sucesso
      setTimeout(() => {
        if (onSuccess) onSuccess(result);
        onClose();
      }, 1500);
    } catch (err) {
      console.error("Erro ao criar GC:", err);
      setError(err.message || "Erro ao criar GC. Tente novamente.");
    } finally {
      setLoading(false);
    }
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

      {success && (
        <div className="p-new-gc__success">GC criado com sucesso!</div>
      )}

      {error && <div className="p-new-gc__error">{error}</div>}

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

        <fieldset className="p-new-gc__address">
          <legend>Líderes</legend>

          <div className="p-new-gc__field">
            <label htmlFor="leaders">Nome</label>
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
            <label htmlFor="leader_contact">Contato</label>
            <PhoneInput
              id="leader_contact"
              name="leader_contact"
              value={formData.leader_contact || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="p-new-gc__field">
            <label htmlFor="co_leader_name">Nome Co-líder</label>
            <input
              type="text"
              id="co_leader_name"
              name="co_leader_name"
              value={formData.co_leader_name}
              onChange={handleChange}
            />
          </div>

          <div className="p-new-gc__field">
            <label htmlFor="co_leader_contact">Contato Co-líder</label>
            <PhoneInput
              id="co_leader_contact"
              name="co_leader_contact"
              value={formData.co_leader_contact || ""}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <div className="p-new-gc__row">
          <div className="p-new-gc__field">
            <label htmlFor="weekday">Dia</label>
            <select
              id="weekday"
              name="weekday"
              value={formData.weekday}
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
              name="is_online"
              checked={formData.is_online}
              onChange={handleChange}
            />
            GC Online
          </label>

          <label>
            <input
              type="checkbox"
              name="is_couple"
              checked={formData.is_couple}
              onChange={handleChange}
            />
            GC de Casais
          </label>
        </div>

        <AnimatePresence>
          {!formData.is_online && (
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
                  required={!formData.is_online}
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
                    required={!formData.is_online}
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
                    required={!formData.is_online}
                  />
                </div>
              </div>
            </motion.fieldset>
          )}
        </AnimatePresence>

        <div className="p-new-gc__buttons">
          <button
            type="button"
            className="p-new-gc__cancel"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button type="submit" className="p-new-gc__submit" disabled={loading}>
            {loading ? "Criando..." : "Criar GC"}
          </button>
        </div>
      </form>
    </div>
  );
};

import { useState } from "react";
import InputMask from "react-input-mask";
import { motion, AnimatePresence } from "framer-motion";

import "./styles.scss";

export const FormConsolidation = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const TOTAL_STEPS = 2;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name.length >= 3;
      case 2:
        return formData.phone.replace(/\D/g, "").length >= 11;
      case 3:
        return formData.address.length >= 5;
      default:
        return false;
    }
  };

  const fadeVariants = {
    enter: {
      opacity: 0,
      scale: 0.95,
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 1.05,
    },
  };

  const renderStep = () => {
    return (
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          custom={direction}
          variants={fadeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
          }}
        >
          {step === 1 && (
            <div>
              <fieldset className="l-consolidation__fieldset">
                <legend>Dados Pessoais</legend>
                <div className="l-consolidation__field">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="name">Nome completo*</label>
                </div>
              </fieldset>

              <fieldset className="l-consolidation__fieldset">
                <legend>Endereço</legend>
                <div className="l-consolidation__row">
                  <div className="l-consolidation__field">
                    <input
                      type="text"
                      id="bairro"
                      name="bairro"
                      value={formData.bairro}
                      onChange={handleInputChange}
                      placeholder=" "
                      required
                    />
                    <label htmlFor="bairro">Bairro*</label>
                  </div>

                  <div className="l-consolidation__field">
                    <input
                      type="text"
                      id="cidade"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      placeholder=" "
                      required
                    />
                    <label htmlFor="cidade">Cidade*</label>
                  </div>
                </div>
              </fieldset>

              <fieldset className="l-consolidation__fieldset">
                <legend>Contato</legend>
                <div className="l-consolidation__field">
                  <InputMask
                    mask="(99) 99999-9999"
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(00) 00000-0000"
                    required
                  />
                  <label htmlFor="phone">Celular</label>
                </div>
              </fieldset>
            </div>
          )}

          {/* {step === 2 && (
            <fieldset className="l-consolidation__fieldset">
              <legend>Endereço</legend>
              <div className="l-consolidation__row">
                <div className="l-consolidation__field">
                  <input
                    type="text"
                    id="bairro"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="bairro">Bairro*</label>
                </div>

                <div className="l-consolidation__field">
                  <input
                    type="text"
                    id="cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="cidade">Cidade*</label>
                </div>
              </div>
            </fieldset>
          )}

          {step === 3 && (
            <fieldset className="l-consolidation__fieldset">
              <legend>Contato</legend>
              <div className="l-consolidation__field">
                <InputMask
                  mask="(99) 99999-9999"
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(00) 00000-0000"
                  required
                />
                <label htmlFor="phone">Celular</label>
              </div>
            </fieldset>
          )} */}

          {step === 2 && (
            <div>
              <fieldset className="l-consolidation__fieldset">
                <legend>O que você deseja? *</legend>
                <div className="l-consolidation__radio-group">
                  <div className="l-consolidation__radio-option">
                    <input
                      type="radio"
                      id="transferir"
                      name="desejo"
                      value="transferir"
                      checked={formData.desejo === "transferir"}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="transferir">Transferir</label>
                  </div>

                  <div className="l-consolidation__radio-option">
                    <input
                      type="radio"
                      id="batizar"
                      name="desejo"
                      value="batizar"
                      checked={formData.desejo === "batizar"}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="batizar">Batizar</label>
                  </div>
                </div>
              </fieldset>

              <fieldset className="l-consolidation__fieldset">
                <legend>Sua Idade? *</legend>
                <div className="l-consolidation__radio-group">
                  <div className="l-consolidation__radio-option">
                    <input
                      type="radio"
                      id="idade_12_17"
                      name="idade"
                      value="12_17"
                      checked={formData.idade === "12_17"}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="idade_12_17">12 à 17 anos</label>
                  </div>

                  <div className="l-consolidation__radio-option">
                    <input
                      type="radio"
                      id="idade_18_25"
                      name="idade"
                      value="18_25"
                      checked={formData.idade === "18_25"}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="idade_18_25">18 à 25 anos</label>
                  </div>

                  <div className="l-consolidation__radio-option">
                    <input
                      type="radio"
                      id="idade_26_35"
                      name="idade"
                      value="26_35"
                      checked={formData.idade === "26_35"}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="idade_26_35">26 à 35 anos</label>
                  </div>

                  <div className="l-consolidation__radio-option">
                    <input
                      type="radio"
                      id="idade_36_45"
                      name="idade"
                      value="36_45"
                      checked={formData.idade === "36_45"}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="idade_36_45">36 à 45 anos</label>
                  </div>

                  <div className="l-consolidation__radio-option">
                    <input
                      type="radio"
                      id="idade_acima_46"
                      name="idade"
                      value="acima_46"
                      checked={formData.idade === "acima_46"}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="idade_acima_46">Acima de 46 anos</label>
                  </div>
                </div>
              </fieldset>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <section className="l-consolidation">
      <header className="l-consolidation__header">
        <h2>Registro de Decisões e Reconciliações</h2>
        <p>
          Formulário destinado ao uso na sala de consolidação, para registrar os
          dados das pessoas que decidiram aceitar Jesus ou se reconciliaram com
          Ele.
        </p>
      </header>

      <div className="l-consolidation__content">
        <form>{renderStep()}</form>
      </div>

      <div className="l-consolidation__actions">
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="l-consolidation__button l-consolidation__button--secondary"
          >
            Voltar
          </button>
        )}

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={handleNext}
            className="l-consolidation__button l-consolidation__button--primary"
          >
            Próximo
          </button>
        ) : (
          <button
            type="submit"
            className="l-consolidation__button l-consolidation__button--success"
          >
            Criar
          </button>
        )}
      </div>
    </section>
  );
};

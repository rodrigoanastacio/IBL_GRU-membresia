import { useState } from "react";
import { fetchAddressFromCep, geocodeAddress } from "../../utils/geocoding";
import "./styles.scss";

export const CepSearch = ({ onLocationFound, setIsLoading }) => {
  const [cep, setCep] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const addressData = await fetchAddressFromCep(cep);
      const address = `${addressData.logradouro}, ${addressData.localidade}, ${addressData.uf}, Brasil`;
      console.log("address", address);
      const coordinates = await geocodeAddress(address);

      onLocationFound({
        ...coordinates,
        address,
      });
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleCepChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCep(value);
  };

  return (
    <form onSubmit={handleSubmit} className="c-cep-search">
      <div className="c-cep-search__field">
        <input
          type="text"
          value={cep}
          onChange={handleCepChange}
          placeholder="Digite seu CEP"
          maxLength="8"
          required
        />
        <button type="submit">Buscar GCs</button>
      </div>
      {error && <p className="c-cep-search__error">{error}</p>}
    </form>
  );
};

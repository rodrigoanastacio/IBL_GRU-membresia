/**
 * Busca o endereço a partir do CEP usando ViaCEP
 * @param {string} cep CEP a ser consultado
 * @returns {Promise<Object>} Dados do endereço
 */
export const fetchAddressFromCep = async (cep) => {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP não encontrado");
  }

  return data;
};

/**
 * Converte um endereço em coordenadas usando Nominatim
 * @param {string} address Endereço completo
 * @returns {Promise<Object>} Coordenadas do endereço
 */
export const geocodeAddress = async (address) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`
  );
  const data = await response.json();

  if (data.length === 0) {
    throw new Error("Localização não encontrada");
  }

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
};

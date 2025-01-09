/**
 * Calcula a distância entre dois pontos usando a fórmula de Haversine
 * @param {number} lat1 Latitude do ponto 1
 * @param {number} lon1 Longitude do ponto 1
 * @param {number} lat2 Latitude do ponto 2
 * @param {number} lon2 Longitude do ponto 2
 * @returns {number} Distância em quilômetros
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Raio da Terra em km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Encontra os GCs mais próximos de uma localização
 * @param {Array} gcs Lista de GCs
 * @param {Object} userCoords Coordenadas do usuário
 * @param {number} limit Número máximo de GCs a retornar
 * @returns {Array} GCs ordenados por distância
 */
export const findNearestGCs = (gcs, userCoords, limit = 3, maxDistance = 3) => {
  return gcs
    .filter((gc) => !gc.isOnline)
    .map((gc) => ({
      ...gc,
      distance: calculateDistance(
        userCoords.lat,
        userCoords.lng,
        gc.coordinates.lat,
        gc.coordinates.lng
      ),
    }))
    .filter((gc) => gc.distance <= maxDistance) // Filtra GCs até 5km
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
};

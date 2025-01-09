import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Importar o ícone personalizado
import customIconUrl from "../../assets/pin.svg"; // Substitua pelo caminho correto do seu ícone

// Definir o ícone personalizado
const customIcon = L.icon({
  iconUrl: customIconUrl, // Caminho para a imagem do pin
  iconSize: [82, 92], // Tamanho do ícone (ajuste conforme necessário)
  iconAnchor: [19, 38], // Ponto de ancoragem do ícone (para centralizar corretamente)
  popupAnchor: [0, -38], // Posição do popup em relação ao ícone
});

export const Map = ({ address, addressDetails }) => {
  const [coordinates, setCoordinates] = useState([0, 0]); // Estado inicial com coordenadas padrão
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        console.log("Buscando coordenadas para o endereço:", address); // Log do endereço para depuração
        // Fazendo a requisição para a API do OpenStreetMap Nominatim
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );
        const data = await response.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          console.log("Coordenadas recebidas:", { lat, lon }); // Log das coordenadas para depuração
          setCoordinates([parseFloat(lat), parseFloat(lon)]);
        } else {
          console.error("Endereço não encontrado:", address);
        }
      } catch (error) {
        console.error("Erro ao buscar coordenadas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
  }, [address]);

  return (
    <>
      {isLoading ? (
        <p style={{ marginTop: "40px" }}>Carregando mapa...</p>
      ) : (
        <MapContainer
          center={coordinates}
          zoom={16}
          style={{ marginTop: "40px", height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={coordinates} icon={customIcon}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
};

import MetaTags from "react-meta-tags";

import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { CepSearch } from "../../components/CepSearch";
import { GCMap } from "../../components/GCMap";
import { items } from "../../data/items";
import { findNearestGCs } from "../../utils/distance";

import "./styles.scss";

export const NearestGC = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestGCs, setNearestGCs] = useState([]);
  const [onlineGCs, setOnlineGCs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   document.title = "Encontre um GC | IBL-GRU";
  // }, []);

  const handleLocationFound = (location) => {
    setUserLocation(location);
    const nearest = findNearestGCs(items, location);
    setNearestGCs(nearest);

    // Buscar GCs online se não houver GCs próximos
    if (nearest.length === 0) {
      const online = items.filter((gc) => gc.isOnline);
      setOnlineGCs(online);
    }

    setIsLoading(false);
  };

  return (
    <>
      <MetaTags>
        <title>Encontre um GC | Igreja Batista da Lagoinha - Guarulhos</title>

        {/* OpenGraph Meta Tags */}
        <meta
          property="og:title"
          content="Encontre um GC | Igreja Batista da Lagoinha - Guarulhos"
        />
        <meta
          property="og:description"
          content="Descubra o GC mais próximo da sua casa e permita-se ser cuidado!"
        />

        <meta property="og:url" content="https://seusite.com/nearest-gc" />

        <meta
          property="og:image"
          content="https://ibl-gru-membresia.vercel.app/share-og.png"
        />
      </MetaTags>

      <Header />
      <div className="p-nearest-gc">
        <div className="p-nearest-gc__container">
          <h2 className="p-nearest-gc__title">
            Encontre o GC mais próximos de você
          </h2>

          <CepSearch
            onLocationFound={handleLocationFound}
            setIsLoading={setIsLoading}
          />

          {isLoading && (
            <div className="p-nearest-gc__loading">
              Buscando GCs próximos...
            </div>
          )}

          {userLocation && !isLoading && (
            <div className="p-nearest-gc__results">
              <GCMap userLocation={userLocation} nearestGCs={nearestGCs} />

              <div className="p-nearest-gc__list">
                <h3>GCs mais próximos:</h3>
                {nearestGCs.length > 0 ? (
                  nearestGCs.map((gc) => (
                    <div key={gc.id} className="p-nearest-gc__item">
                      <h4>{gc.title}</h4>
                      <p>Líderes: {gc.leaders}</p>
                      <p>Distância: {gc.distance.toFixed(1)}km</p>
                      <p>
                        {gc.addressDetails.street}, {gc.addressDetails.number}
                        <br />
                        {gc.addressDetails.neighborhood}
                      </p>
                    </div>
                  ))
                ) : (
                  <>
                    <p className="p-nearest-gc__no-results">
                      Não encontramos GCs presenciais em um raio de 5km. Que tal
                      participar de um dos nossos GCs online?
                    </p>
                    {onlineGCs.map((gc) => (
                      <div key={gc.id} className="p-nearest-gc__item">
                        <h4>{gc.title}</h4>
                        <p>Líderes: {gc.leaders}</p>
                        <p>
                          Dia: {gc.data} às {gc.time}
                        </p>
                        <p>Contato: {gc.contact}</p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

import { useState } from "react";

interface ViaCepResponse {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export function useCep() {
  const [loading, setLoading] = useState(false);

  const fetchAddress = async (cep: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        throw new Error("CEP não encontrado");
      }

      return data;
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { fetchAddress, loading };
}

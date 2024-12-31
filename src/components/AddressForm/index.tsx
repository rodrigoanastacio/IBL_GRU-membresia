import { useFormContext } from "react-hook-form";
import { MapPin, Loader2 } from "lucide-react";
import { useCep } from "../../hooks/useCep";
import * as S from "./styles";
import { Input } from "../Input";

export function AddressForm() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { fetchAddress, loading } = useCep();

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");

    if (cep.length === 8) {
      const address = await fetchAddress(cep);

      if (address) {
        setValue("street", address.logradouro);
        setValue("neighborhood", address.bairro);
        setValue("city", address.localidade);
        setValue("state", address.uf);
      }
    }
  };

  return (
    <S.Container>
      <S.Row>
        <S.CepContainer>
          <Input
            label="CEP"
            placeholder="00000-000"
            {...register("cep")}
            onChange={handleCepChange}
            error={errors.cep?.message as string}
          />
          {loading && (
            <S.LoadingIcon>
              <Loader2 size={20} />
            </S.LoadingIcon>
          )}
        </S.CepContainer>
      </S.Row>

      <Input
        label="Rua"
        icon={MapPin}
        placeholder="Digite seu endereço"
        {...register("street")}
        error={errors.street?.message as string}
      />

      <S.Row>
        <Input
          label="Número"
          placeholder="Nº"
          {...register("number")}
          error={errors.number?.message as string}
        />
        <Input
          label="Complemento"
          placeholder="Apto, Bloco, etc"
          {...register("complement")}
          error={errors.complement?.message as string}
        />
      </S.Row>

      <Input
        label="Bairro"
        {...register("neighborhood")}
        error={errors.neighborhood?.message as string}
      />

      <S.Row>
        <Input
          label="Cidade"
          {...register("city")}
          error={errors.city?.message as string}
        />
        <Input
          label="Estado"
          {...register("state")}
          error={errors.state?.message as string}
        />
      </S.Row>
    </S.Container>
  );
}

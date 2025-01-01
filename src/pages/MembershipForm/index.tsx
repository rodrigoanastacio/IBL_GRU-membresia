import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Input } from "../../components/Input";
import { FileUpload } from "../../components/FileUpload";
import { Select } from "../../components/Select";
import { Checkbox } from "../../components/Checkbox";
import { RadioGroup } from "../../components/RadioGroup";
import { DatePicker } from "../../components/DatePicker";
import { MaskedInput } from "../../components/MaskedInput";
import { AddressForm } from "../../components/AddressForm";
import { membershipFormSchema, type MembershipFormData } from "./validation";
import { createMember } from "../../services/member";
import * as S from "./styles";
import { useState } from 'react';

const maritalStatusOptions = [
  { value: "Casado Civil", label: "Casado Civil" },
  { value: "Casado Civil e Religioso", label: "Casado Civil e Religioso" },
  { value: "Divorciado(a)", label: "Divorciado(a)" },
  { value: "Solteiro(a)", label: "Solteiro(a)" },
  { value: "Viúvo(a)", label: "Viúvo(a)" },
];

const volunteerOptions = [
  { value: true, label: "Sim" },
  { value: false, label: "Não" },
];

export function MembershipForm() {
  const methods = useForm<MembershipFormData>({
    resolver: zodResolver(membershipFormSchema),
  });

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: MembershipFormData) => {
    try {
      await createMember(data);
      toast.success("Ficha de membro cadastrada com sucesso!");
      methods.reset(); // Limpa o formulário após o sucesso
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar ficha de membro. Tente novamente.");
    }
  };

  return (
    <S.Container>
      <S.FormContainer>
        <S.Title>Ficha de Membro</S.Title>
        <FormProvider {...methods}>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Nome Completo"
              {...register("fullName")}
              error={errors.fullName?.message}
            />

            <S.Row>
              <DatePicker
                label="Data de Nascimento"
                value={watch("birthDate") ? new Date(watch("birthDate")) : null}
                onChange={(date) =>
                  setValue("birthDate", date?.toISOString() || "")
                }
                error={errors.birthDate?.message}
                required
                maxDate={new Date()}
              />
              <DatePicker
                label="Data de Batismo"
                value={
                  watch("baptismDate") ? new Date(watch("baptismDate")) : null
                }
                onChange={(date) =>
                  setValue("baptismDate", date?.toISOString() || "")
                }
                error={errors.baptismDate?.message}
                required
                maxDate={new Date()}
              />
            </S.Row>

            <Input
              label="Igreja em que foi batizado"
              {...register("baptismChurch")}
              error={errors.baptismChurch?.message}
            />

            <S.Row>
              <MaskedInput
                label="Telefone"
                mask="(99) 99999-9999"
                placeholder="(00) 00000-0000"
                {...register("phone")}
                error={errors.phone?.message}
                required
              />
              <Input
                label="E-mail"
                type="email"
                {...register("email")}
                error={errors.email?.message}
              />
            </S.Row>

            <AddressForm />

            <S.Row>
              <Input
                label="Profissão"
                {...register("profession")}
                error={errors.profession?.message}
              />
              <Select
                label="Estado Civil"
                options={maritalStatusOptions}
                {...register("maritalStatus")}
                error={errors.maritalStatus?.message}
              />
            </S.Row>

            <FileUpload
              label="Certidão de Casamento"
              subtitle="Ou Averbação de Divórcio"
              accept=".pdf,.jpg,.jpeg,.png"
              {...register("marriageCertificate")}
              error={errors.marriageCertificate?.message}
            />

            <FileUpload
              label="RG ou CNH"
              accept=".pdf,.jpg,.jpeg,.png"
              {...register("identification")}
              error={errors.identification?.message}
            />

            <Input
              label="Quem realizou a sua entrevista pastoral?"
              {...register("pastoralInterviewer")}
              error={errors.pastoralInterviewer?.message}
            />

            <Checkbox label="Pertence ao GC" {...register("belongsToGC")} />
            <RadioGroup
              label="Deseja participar do Giro de Voluntários?"
              options={volunteerOptions}
              value={watch("wantsToVolunteer")}
              onChange={(value) =>
                setValue("wantsToVolunteer", value as boolean)
              }
              error={errors.wantsToVolunteer?.message}
              required
            />

            <S.SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Formulário"}
            </S.SubmitButton>
          </S.Form>
        </FormProvider>
      </S.FormContainer>
    </S.Container>
  );
}

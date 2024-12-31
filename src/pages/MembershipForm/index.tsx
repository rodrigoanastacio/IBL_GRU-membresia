import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Input } from "../../components/Input";
import { FileUpload } from "../../components/FileUpload";
import { Select } from "../../components/Select";
import { Checkbox } from "../../components/Checkbox";
import { RadioGroup } from "../../components/RadioGroup";
import { AddressForm } from "../../components/AddressForm";
import { membershipFormSchema, type MembershipFormData } from "./validation";
import { createMember } from "../../services/member";
import * as S from "./styles";

const maritalStatusOptions = [
  { value: "casado-civil", label: "Casado Civil" },
  { value: "casado-civil-religioso", label: "Casado Civil e Religioso" },
  { value: "divorciado", label: "Divorciado(a)" },
  { value: "solteiro", label: "Solteiro(a)" },
  { value: "viuvo", label: "Viúvo(a)" },
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
              <Input
                label="Data de Nascimento"
                type="date"
                {...register("birthDate")}
                error={errors.birthDate?.message}
              />
              <Input
                label="Data de Batismo"
                type="date"
                {...register("baptismDate")}
                error={errors.baptismDate?.message}
              />
            </S.Row>

            <Input
              label="Igreja em que foi batizado"
              {...register("baptismChurch")}
              error={errors.baptismChurch?.message}
            />

            <S.Row>
              <Input
                label="Telefone"
                {...register("phone")}
                error={errors.phone?.message}
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

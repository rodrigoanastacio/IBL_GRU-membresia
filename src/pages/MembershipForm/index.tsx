import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/Input";
import { FileUpload } from "../../components/FileUpload";
import { Select } from "../../components/Select";
import { Checkbox } from "../../components/Checkbox";
import { AddressForm } from "../../components/AddressForm";
import { membershipFormSchema, type MembershipFormData } from "./validation";
import * as S from "./styles";

const maritalStatusOptions = [
  { value: "solteiro", label: "Solteiro(a)" },
  { value: "casado", label: "Casado(a)" },
  { value: "divorciado", label: "Divorciado(a)" },
  { value: "viuvo", label: "Viúvo(a)" },
];

export function MembershipForm() {
  const methods = useForm<MembershipFormData>({
    resolver: zodResolver(membershipFormSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data: MembershipFormData) => {
    console.log(data);
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

            <S.CheckboxGroup>
              <Checkbox label="Pertence ao GC" {...register("belongsToGC")} />
              <Checkbox
                label="Deseja participar do Giro de Voluntários?"
                {...register("wantsToVolunteer")}
              />
            </S.CheckboxGroup>

            <S.SubmitButton type="submit">Enviar Formulário</S.SubmitButton>
          </S.Form>
        </FormProvider>
      </S.FormContainer>
    </S.Container>
  );
}

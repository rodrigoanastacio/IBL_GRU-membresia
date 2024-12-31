import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

const fileSchema = z.any()
  .refine((file) => !file || file instanceof File, {
    message: "Deve ser um arquivo válido",
  })
  .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
    message: "O arquivo deve ter no máximo 5MB",
  })
  .refine((file) => !file || ACCEPTED_FILE_TYPES.includes(file.type), {
    message: "Tipo de arquivo não suportado. Use PDF, JPG ou PNG",
  });

export const membershipFormSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  baptismDate: z.string().min(1, "Data de batismo é obrigatória"),
  baptismChurch: z.string().min(1, "Igreja do batismo é obrigatória"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  email: z.string().email("E-mail inválido"),
  cep: z.string().min(8, "CEP inválido").max(9, "CEP inválido"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z
    .string()
    .min(2, "Estado é obrigatório")
    .max(2, "Use a sigla do estado"),
  profession: z.string().min(1, "Profissão é obrigatória"),
  maritalStatus: z.string().min(1, "Estado civil é obrigatório"),
  marriageCertificate: z.instanceof(FileList).optional().or(z.instanceof(File).optional()),
  identification: z.instanceof(FileList).optional().or(z.instanceof(File).optional()),
  pastoralInterviewer: z.string().min(1, "Nome do entrevistador é obrigatório"),
  belongsToGC: z.boolean(),
  wantsToVolunteer: z.boolean(),
});

export type MembershipFormData = z.infer<typeof membershipFormSchema>;

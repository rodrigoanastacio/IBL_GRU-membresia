import { z } from 'zod';

export const membershipFormSchema = z.object({
  fullName: z.string().min(3, 'Nome completo é obrigatório'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
  baptismDate: z.string().min(1, 'Data de batismo é obrigatória'),
  baptismChurch: z.string().min(1, 'Igreja do batismo é obrigatória'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  email: z.string().email('E-mail inválido'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  profession: z.string().min(1, 'Profissão é obrigatória'),
  maritalStatus: z.string().min(1, 'Estado civil é obrigatório'),
  marriageCertificate: z.any().optional(),
  identification: z.any().optional(),
  pastoralInterviewer: z.string().min(1, 'Nome do entrevistador é obrigatório'),
  belongsToGC: z.boolean(),
  wantsToVolunteer: z.boolean()
});

export type MembershipFormData = z.infer<typeof membershipFormSchema>;
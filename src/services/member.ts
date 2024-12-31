import { supabase } from "../lib/supabase";
import { MembershipFormData } from "../pages/MembershipForm/validation";

export async function createMember(data: MembershipFormData) {
  const { error } = await supabase.from("members").insert([
    {
      full_name: data.fullName,
      birth_date: data.birthDate,
      baptism_date: data.baptismDate,
      baptism_church: data.baptismChurch,
      phone: data.phone,
      email: data.email,
      profession: data.profession,
      marital_status: data.maritalStatus,
      pastoral_interviewer: data.pastoralInterviewer,
      belongs_to_gc: data.belongsToGC,
      wants_to_volunteer: data.wantsToVolunteer,
      // Endereço - acessando diretamente as propriedades
      cep: data.cep,
      street: data.street,
      number: data.number,
      complement: data.complement,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
    },
  ]);

  if (error) throw error;
}

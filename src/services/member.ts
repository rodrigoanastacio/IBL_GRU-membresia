import { supabase } from "../lib/supabase";
import { MembershipFormData } from "../pages/MembershipForm/validation";

async function uploadFile(file: File, bucket: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError, data } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function createMember(data: MembershipFormData) {
  let marriageCertificateUrl = null;
  let identificationUrl = null;

  if (data.marriageCertificate instanceof File) {
    marriageCertificateUrl = await uploadFile(data.marriageCertificate, 'documents');
  }

  if (data.identification instanceof File) {
    identificationUrl = await uploadFile(data.identification, 'documents');
  }

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
      marriage_certificate_url: marriageCertificateUrl,
      identification_url: identificationUrl,
      pastoral_interviewer: data.pastoralInterviewer,
      belongs_to_gc: data.belongsToGC,
      wants_to_volunteer: data.wantsToVolunteer,
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

export async function getMembers() {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

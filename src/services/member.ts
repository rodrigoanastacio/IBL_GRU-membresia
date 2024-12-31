import { supabase } from "../lib/supabase";
import { MembershipFormData } from "../pages/MembershipForm/validation";
import imageCompression from 'browser-image-compression';

const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

async function compressImageIfNeeded(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) {
    return file;
  }

  try {
    return await imageCompression(file, compressionOptions);
  } catch (error) {
    console.error('Error compressing image:', error);
    return file;
  }
}

async function uploadFile(file: File | null | undefined, bucket: string) {
  if (!file) return null;
  
  try {
    // Comprimir a imagem antes do upload
    const fileToUpload = await compressImageIfNeeded(file);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, fileToUpload);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}

export async function createMember(data: MembershipFormData) {
  try {
    const marriageCertificateFile = data.marriageCertificate instanceof FileList 
      ? data.marriageCertificate[0] 
      : data.marriageCertificate as File;

    const identificationFile = data.identification instanceof FileList 
      ? data.identification[0] 
      : data.identification as File;

    const [marriageCertificateUrl, identificationUrl] = await Promise.all([
      uploadFile(marriageCertificateFile, 'documents'),
      uploadFile(identificationFile, 'documents')
    ]);

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
  } catch (error) {
    console.error('Error creating member:', error);
    throw error;
  }
}

export async function getMembers() {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

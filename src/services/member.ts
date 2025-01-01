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
    console.log('Iniciando processo de criação do membro');

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

    console.log('Arquivos carregados com sucesso');

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

    console.log('Membro criado com sucesso');
  } catch (error) {
    console.error('Error creating member:', error);
    throw error;
  }
}

export async function getMembers() {
  console.log('Buscando membros');

  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar membros:", error);
    throw error;
  }

  console.log('Membros encontrados com sucesso');
  return data;
}

export async function deleteMember(id: string) {
  try {
    console.log('Iniciando processo de exclusão do membro:', id);

    // Primeiro, buscar o membro para pegar as URLs dos documentos
    const { data: member, error: fetchError } = await supabase
      .from("members")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Erro ao buscar membro:", fetchError);
      throw fetchError;
    }

    console.log('Membro encontrado:', member);

    // Deletar os arquivos do storage se existirem
    if (member) {
      const bucket = supabase.storage.from("documents");
      
      if (member.marriage_certificate_url) {
        const path = member.marriage_certificate_url.split("/").pop();
        if (path) {
          console.log('Removendo certidão de casamento:', path);
          const { error: removeError } = await bucket.remove([path]);
          if (removeError) {
            console.error("Erro ao remover certidão de casamento:", removeError);
          }
        }
      }

      if (member.identification_url) {
        const path = member.identification_url.split("/").pop();
        if (path) {
          console.log('Removendo documento de identificação:', path);
          const { error: removeError } = await bucket.remove([path]);
          if (removeError) {
            console.error("Erro ao remover documento de identificação:", removeError);
          }
        }
      }
    }

    console.log('Iniciando remoção do registro no banco...');

    // Deletar o registro da tabela usando RPC
    const { data: deleteData, error: deleteError } = await supabase
      .rpc('delete_member', { member_id: id });

    if (deleteError) {
      console.error("Erro ao deletar membro:", deleteError);
      throw deleteError;
    }

    console.log('Registro deletado com sucesso:', deleteData);
    return true;
  } catch (error) {
    console.error("Erro ao processar exclusão:", error);
    throw error;
  }
}

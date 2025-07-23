import { supabase } from "../lib/supabase";
import { MembershipFormData } from "../pages/MembershipForm/validation";
import imageCompression from "browser-image-compression";

const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

async function compressImageIfNeeded(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) {
    return file;
  }

  try {
    return await imageCompression(file, compressionOptions);
  } catch (error) {
    console.error("Error compressing image:", error);
    return file;
  }
}

async function uploadFile(file: File | null | undefined, bucket: string) {
  if (!file) return null;

  try {
    // Comprimir a imagem antes do upload
    const fileToUpload = await compressImageIfNeeded(file);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, fileToUpload);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
}

async function removeFileFromStorage(url: string | null) {
  if (!url) return;

  try {
    // Se for uma URL completa do Supabase, extrair apenas o nome do arquivo
    const fileName = url.includes("storage/v1/object/public/documents/")
      ? url.split("documents/").pop()
      : url;

    if (!fileName) {
      console.error("Nome do arquivo não encontrado na URL:", url);
      return;
    }

    console.log("Removendo arquivo:", fileName);

    const { data, error } = await supabase.storage
      .from("documents")
      .remove([fileName]);

    if (error) {
      console.error("Erro ao remover arquivo:", error);
      throw error;
    }

    console.log("Arquivo removido com sucesso:", fileName);
    return data;
  } catch (error) {
    console.error("Erro ao processar remoção do arquivo:", error);
    throw error;
  }
}

export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("members")
      .select("id")
      .eq("email", email)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Erro ao verificar email:", error);
      throw error;
    }

    return !!data;
  } catch (error) {
    console.error("Erro ao verificar email:", error);
    throw error;
  }
}

export async function createMember(data: MembershipFormData) {
  try {
    console.log("Iniciando processo de criação do membro");

    // Verificar se o email já existe
    const emailExists = await checkEmailExists(data.email);
    if (emailExists) {
      throw new Error("Este email já está cadastrado no sistema");
    }

    const marriageCertificateFile =
      data.marriageCertificate instanceof FileList
        ? data.marriageCertificate[0]
        : (data.marriageCertificate as File);

    const identificationFile =
      data.identification instanceof FileList
        ? data.identification[0]
        : (data.identification as File);

    const [marriageCertificateUrl, identificationUrl] = await Promise.all([
      uploadFile(marriageCertificateFile, "documents"),
      uploadFile(identificationFile, "documents"),
    ]);

    console.log("Arquivos carregados com sucesso");

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
        gc_name: data.gcName,
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

    console.log("Membro criado com sucesso");
  } catch (error) {
    console.error("Error creating member:", error);
    throw error;
  }
}

export async function getMembers() {
  console.log("Buscando membros");

  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar membros:", error);
    throw error;
  }

  console.log("Membros encontrados:", data); // Adicione este log
  console.log("Quantidade de membros:", data?.length); // E este também

  return data;
}

export async function deleteMember(id: string) {
  try {
    console.log("Iniciando processo de exclusão do membro:", id);

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

    console.log("Membro encontrado:", member);

    // Deletar os arquivos do storage se existirem
    if (member) {
      try {
        // Remover arquivos em paralelo
        await Promise.all(
          [
            member.marriage_certificate_url &&
              removeFileFromStorage(member.marriage_certificate_url),
            member.identification_url &&
              removeFileFromStorage(member.identification_url),
          ].filter(Boolean)
        );
      } catch (storageError) {
        console.error("Erro ao remover arquivos do storage:", storageError);
        // Continuar com a deleção do registro mesmo se falhar ao remover arquivos
      }
    }

    console.log("Iniciando remoção do registro no banco...");

    // Deletar o registro da tabela usando RPC
    const { data: deleteData, error: deleteError } = await supabase.rpc(
      "delete_member",
      { member_id: id }
    );

    if (deleteError) {
      console.error("Erro ao deletar membro:", deleteError);
      throw deleteError;
    }

    console.log("Registro deletado com sucesso:", deleteData);
    return true;
  } catch (error) {
    console.error("Erro ao processar exclusão:", error);
    throw error;
  }
}

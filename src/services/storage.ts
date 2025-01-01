import { supabase } from "../lib/supabase";

interface BucketInfo {
  name: string;
  size: number;
  totalSize: number;
  fileCount: number;
}

export async function getBucketInfo(bucketName: string): Promise<BucketInfo | null> {
  try {
    // Listar todos os arquivos no bucket
    const { data: files, error } = await supabase
      .storage
      .from(bucketName)
      .list();

    if (error) throw error;

    // Calcular o tamanho total e contagem de arquivos
    const size = files.reduce((acc, file) => acc + (file.metadata?.size || 0), 0);
    const fileCount = files.length;

    // O tamanho total do bucket gratuito do Supabase é 1GB
    const totalSize = 1 * 1024 * 1024 * 1024; // 1GB em bytes

    return {
      name: bucketName,
      size,
      totalSize,
      fileCount
    };
  } catch (error) {
    console.error('Error getting bucket info:', error);
    return null;
  }
}

// Função para formatar o tamanho em bytes para uma string legível
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

async function removeFile(fileName: string) {
  try {
    console.log(`Tentando remover arquivo: ${fileName}`);
    
    // Tentar remover via RPC
    const { data, error } = await supabase.rpc('delete_storage_object', {
      bucket_name: 'documents',
      file_path: fileName
    });

    if (error) {
      console.error(`Erro ao remover ${fileName} via RPC:`, error);
      return false;
    }

    // Verificar se o arquivo ainda existe
    const { data: checkData, error: checkError } = await supabase
      .storage
      .from('documents')
      .list('', {
        search: fileName
      });

    if (checkData && checkData.length > 0) {
      console.error(`Arquivo ${fileName} ainda existe após remoção`);
      return false;
    }

    console.log(`Arquivo ${fileName} removido com sucesso`);
    return true;
  } catch (error) {
    console.error(`Falha ao remover ${fileName}:`, error);
    return false;
  }
}

export async function cleanupOrphanedFiles() {
  console.log('🧹 Iniciando limpeza de arquivos órfãos...');

  try {
    // Usar função RPC para limpar todos os arquivos
    const { data, error } = await supabase.rpc('delete_all_storage_files', {
      bucket_name: 'documents'
    });

    if (error) {
      console.error('❌ Erro ao limpar arquivos:', error);
      throw error;
    }

    console.log('🎉 Limpeza concluída!', {
      removedFiles: data
    });

    return {
      removedFiles: data
    };
  } catch (error) {
    console.error('❌ Erro durante limpeza de arquivos:', error);
    throw error;
  }
}

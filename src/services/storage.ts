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

import { File } from 'lucide-react';
import * as S from './styles';

interface FilePreviewProps {
  file: File;
}

export function FilePreview({ file }: FilePreviewProps) {
  return (
    <S.PreviewContainer>
      <File size={24} />
      <S.FileInfo>
        <S.FileName>{file.name}</S.FileName>
        <S.FileSize>{formatFileSize(file.size)}</S.FileSize>
      </S.FileInfo>
    </S.PreviewContainer>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
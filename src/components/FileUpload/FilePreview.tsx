import { File } from 'lucide-react';
import styled from 'styled-components';

const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #374151;
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const FileName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

const FileSize = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
`;

interface FilePreviewProps {
  file: File;
}

export function FilePreview({ file }: FilePreviewProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <PreviewContainer>
      <File size={24} />
      <FileInfo>
        <FileName>{file.name}</FileName>
        <FileSize>{formatFileSize(file.size)}</FileSize>
      </FileInfo>
    </PreviewContainer>
  );
}
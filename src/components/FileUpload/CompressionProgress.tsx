import styled from 'styled-components';

interface CompressionProgressProps {
  originalSize: number;
  compressedSize: number;
  isCompressing: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: #f9fafb;
  border-radius: 0.25rem;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 4px;
  background-color: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ progress }) => progress}%;
    background-color: #2563eb;
    transition: width 0.3s ease;
  }
`;

const Text = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
`;

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const CompressionProgress = ({ 
  originalSize, 
  compressedSize, 
  isCompressing 
}: CompressionProgressProps) => {
  const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;
  const progress = isCompressing ? 50 : compressionRatio;

  return (
    <Container>
      <ProgressBar progress={progress} />
      <Text>
        {isCompressing ? (
          'Comprimindo imagem...'
        ) : (
          <>
            Tamanho reduzido de {formatBytes(originalSize)} para {formatBytes(compressedSize)}
            {' '}({compressionRatio.toFixed(1)}% menor)
          </>
        )}
      </Text>
    </Container>
  );
};

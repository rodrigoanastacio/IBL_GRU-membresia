import { forwardRef, InputHTMLAttributes, useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import * as S from './styles';
import { FilePreview } from './FilePreview';
import { CompressionProgress } from './CompressionProgress';
import imageCompression from 'browser-image-compression';

interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  subtitle?: string;
  error?: string;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ label, subtitle, error, onChange, ...props }, ref) => {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isCompressing, setIsCompressing] = useState(false);
    const [originalSize, setOriginalSize] = useState(0);
    const [compressedSize, setCompressedSize] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const compressImage = async (imageFile: File) => {
      if (!imageFile.type.startsWith('image/')) {
        return imageFile;
      }

      setIsCompressing(true);
      setOriginalSize(imageFile.size);

      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(imageFile, options);
        setCompressedSize(compressedFile.size);
        setIsCompressing(false);
        return compressedFile;
      } catch (error) {
        console.error('Error compressing image:', error);
        setIsCompressing(false);
        return imageFile;
      }
    };

    const handleFileSelection = async (selectedFile: File) => {
      setFile(selectedFile);
      const processedFile = await compressImage(selectedFile);
      
      if (onChange) {
        const event = {
          target: {
            name: props.name,
            files: [processedFile],
            value: processedFile,
            type: 'file'
          }
        } as any;
        onChange(event);
      }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFileSelection(droppedFile);
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        handleFileSelection(selectedFile);
      }
    };

    const handleClick = () => {
      inputRef.current?.click();
    };

    return (
      <S.FileUploadContainer>
        <S.FileUploadLabel>{label}</S.FileUploadLabel>
        {subtitle && <S.FileUploadSubtitle>{subtitle}</S.FileUploadSubtitle>}
        
        <S.FileUploadDropZone
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          isDragging={isDragging}
        >
          {file ? (
            <FilePreview file={file} />
          ) : (
            <>
              <Upload size={24} />
              <S.FileUploadDropzoneText>
                Arraste e solte ou clique para selecionar
              </S.FileUploadDropzoneText>
            </>
          )}
        </S.FileUploadDropZone>

        {file?.type.startsWith('image/') && (
          <CompressionProgress
            originalSize={originalSize}
            compressedSize={compressedSize}
            isCompressing={isCompressing}
          />
        )}

        <input
          type="file"
          ref={(e) => {
            inputRef.current = e;
            if (typeof ref === 'function') {
              ref(e);
            } else if (ref) {
              ref.current = e;
            }
          }}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          {...props}
        />
        
        {error && <S.FileUploadError>{error}</S.FileUploadError>}
      </S.FileUploadContainer>
    );
  }
);
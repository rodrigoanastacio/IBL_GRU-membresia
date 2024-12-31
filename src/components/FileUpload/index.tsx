import { forwardRef, InputHTMLAttributes, useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import * as S from './styles';
import { FilePreview } from './FilePreview';

interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  subtitle?: string;
  error?: string;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ label, subtitle, error, onChange, ...props }, ref) => {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

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
        setFile(droppedFile);
        if (onChange) {
          const event = {
            target: {
              name: props.name,
              files: [droppedFile],
              value: droppedFile,
              type: 'file'
            }
          } as any;
          onChange(event);
        }
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
        if (onChange) {
          const event = {
            target: {
              name: e.target.name,
              files: [selectedFile],
              value: selectedFile,
              type: 'file'
            }
          } as any;
          onChange(event);
        }
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
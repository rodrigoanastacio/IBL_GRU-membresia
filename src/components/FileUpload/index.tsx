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
          const event = { target: { files: [droppedFile] } } as any;
          onChange(event);
        }
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
      }
      if (onChange) {
        onChange(e);
      }
    };

    const handleClick = () => {
      inputRef.current?.click();
    };

    return (
      <S.Container>
        <S.Label>{label}</S.Label>
        {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
        
        <S.UploadArea
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          $isDragging={isDragging}
          $hasError={!!error}
        >
          <input
            type="file"
            ref={(e) => {
              if (typeof ref === 'function') {
                ref(e);
              } else if (ref) {
                ref.current = e;
              }
              inputRef.current = e;
            }}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            {...props}
          />
          
          {file ? (
            <FilePreview file={file} />
          ) : (
            <S.UploadContent>
              <Upload size={24} />
              <S.UploadText>
                Clique aqui / Solte o arquivo aqui
              </S.UploadText>
            </S.UploadContent>
          )}
        </S.UploadArea>
        
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.Container>
    );
  }
);

FileUpload.displayName = 'FileUpload';
import styled, { css } from 'styled-components';

interface FileUploadDropZoneProps {
  isDragging: boolean;
}

export const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const FileUploadLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

export const FileUploadSubtitle = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  font-style: italic;
`;

export const FileUploadDropZone = styled.div<FileUploadDropZoneProps>`
  border: 2px dashed #e5e7eb;
  border-radius: 0.5rem;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 150px;
  
  ${({ isDragging }) => isDragging && css`
    border-color: #2563eb;
    background-color: #eff6ff;
  `}
  
  &:hover {
    border-color: #2563eb;
    background-color: #eff6ff;
  }
`;

export const FileUploadDropzoneText = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
`;

export const FileUploadError = styled.span`
  font-size: 0.75rem;
  color: #dc2626;
`;
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

export const Subtitle = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  font-style: italic;
`;

interface UploadAreaProps {
  $isDragging: boolean;
  $hasError: boolean;
}

export const UploadArea = styled.div<UploadAreaProps>`
  border: 2px dashed #e5e7eb;
  border-radius: 0.5rem;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #f9fafb;
  
  ${({ $isDragging }) => $isDragging && css`
    border-color: #2563eb;
    background-color: #eff6ff;
  `}
  
  ${({ $hasError }) => $hasError && css`
    border-color: #dc2626;
    background-color: #fef2f2;
  `}
  
  &:hover {
    border-color: #2563eb;
    background-color: #eff6ff;
  }
`;

export const UploadContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
`;

export const UploadText = styled.span`
  font-size: 0.875rem;
  text-align: center;
`;

export const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #374151;
`;

export const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const FileName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

export const FileSize = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
`;

export const ErrorMessage = styled.span`
  color: #dc2626;
  font-size: 0.75rem;
`;
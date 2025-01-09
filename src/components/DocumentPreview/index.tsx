import { useState } from "react";
import { FileText, Maximize2, X } from "lucide-react";
import * as S from "./styles";

interface DocumentPreviewProps {
  url: string;
  title: string;
}

export function DocumentPreview({ url, title }: DocumentPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const isPDF = url.toLowerCase().endsWith(".pdf");

  return (
    <>
      <S.Container>
        <S.PreviewCard onClick={() => setIsExpanded(true)}>
          {isLoading && !isPDF && <S.LoadingSpinner />}

          {isPDF ? (
            <S.FallbackContainer>
              <FileText size={24} />
              <S.FallbackText>Visualizar PDF</S.FallbackText>
            </S.FallbackContainer>
          ) : (
            <>
              {hasError ? (
                <S.FallbackContainer>
                  <FileText size={24} />
                  <S.FallbackText>Visualizar Documento</S.FallbackText>
                </S.FallbackContainer>
              ) : (
                <S.Thumbnail
                  src={url}
                  alt={title}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{ display: isLoading ? "none" : "block" }}
                />
              )}
            </>
          )}

          <S.PreviewOverlay>
            <Maximize2 size={20} />
          </S.PreviewOverlay>
        </S.PreviewCard>
        <S.Title>{title}</S.Title>
      </S.Container>

      {isExpanded && (
        <S.Modal onClick={() => setIsExpanded(false)}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>{title}</S.ModalTitle>
              <S.CloseButton onClick={() => setIsExpanded(false)}>
                <X size={24} />
              </S.CloseButton>
            </S.ModalHeader>
            <S.ModalBody>
              {isPDF ? (
                <S.PDFViewer src={url} title={title} />
              ) : (
                <S.FullImage src={url} alt={title} />
              )}
            </S.ModalBody>
          </S.ModalContent>
        </S.Modal>
      )}
    </>
  );
}

import { AlertTriangle } from 'lucide-react';
import * as S from './styles';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  isLoading = false
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onCancel}>
      <S.Container onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <S.IconContainer>
          <AlertTriangle size={24} />
        </S.IconContainer>

        <S.Content>
          <S.Title>{title}</S.Title>
          <S.Message>{message}</S.Message>
        </S.Content>

        <S.Actions>
          <S.CancelButton 
            onClick={onCancel}
            disabled={isLoading}
            type="button"
          >
            {cancelLabel}
          </S.CancelButton>
          <S.ConfirmButton 
            onClick={onConfirm}
            disabled={isLoading}
            type="button"
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <S.LoadingSpinner />
                Excluindo...
              </>
            ) : (
              confirmLabel
            )}
          </S.ConfirmButton>
        </S.Actions>
      </S.Container>
    </S.Overlay>
  );
}

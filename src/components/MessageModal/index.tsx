import { X } from "lucide-react";
import * as S from "./styles";

interface MessageModalProps {
  isOpen: boolean;
  member: any;
  onClose: () => void;
}

export function MessageModal({ isOpen, member, onClose }: MessageModalProps) {
  if (!isOpen || !member) return null;

  console.log("Message", member);

  const formatPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/\D/g, "");
  };

  const whatsappMessage = `Olá, ${member.full_name}  tudo bem?%0A%0AVocê foi cadastrado em nossa lista de membros da igreja e gostaríamos de te convidar a participar de um GC mais próximo de sua residência.%0A%0AAcesse o link https://ibl-gru-membresia.vercel.app/encontrar-gc para encontrar o GC ideal para você.%0A%0AAguardamos você!`;

  const whatsappLink = `https://wa.me/55${formatPhoneNumber(
    member.phone
  )}?text=${whatsappMessage}`;

  return (
    <S.Overlay onClick={onClose}>
      <S.Container onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Title>Enviar Mensagem para {member.full_name}</S.Title>
          <S.CloseButton onClick={onClose}>
            <X size={24} />
          </S.CloseButton>
        </S.Header>
        <S.Body>
          {!member.belongs_to_gc ? (
            <S.WhatsAppLink
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enviar mensagem por WhatsApp
            </S.WhatsAppLink>
          ) : (
            <p>Este membro já está ativo em um GC.</p>
          )}
        </S.Body>
      </S.Container>
    </S.Overlay>
  );
}

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

  const whatsappMessage = `Olá, ${member.full_name} a paz! Tudo bem?\n\nEsperamos que esteja tudo ótimo por aí! Você preencheu recentemente nossa ficha de membros e informou que não participa de nenhum GC, adoraríamos te convidar a participar de um *Grupo de Comunhão (GC)* mais próximo da sua residência.\n\nÉ uma ótima oportunidade para se conectar com outras pessoas, fortalecer sua fé e viver momentos em comunhão com demais irmãos da Igreja!\n\nPara encontrar o GC ideal para você, é só acessar o link abaixo:\nhttps://ibl-gru-membresia.vercel.app/encontrar-gc\n\nFicaremos muito felizes em te receber! Se tiver qualquer dúvida ou precisar de ajuda, é só nos avisar. Estamos aqui para ajudar!\n\n*Um abraço e até breve!*\nIgreja Batista da Lagoinha Guarulhos`;

  const whatsappLink = `https://wa.me/55${formatPhoneNumber(
    member.phone
  )}?text=${encodeURIComponent(whatsappMessage)}`;

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

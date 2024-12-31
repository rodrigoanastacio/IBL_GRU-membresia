import { useRef } from 'react';
import { X, Download } from 'lucide-react';
import * as S from './styles';
import { formatDate } from '../../utils/date';
import { generatePDF } from '../../services/pdf';

interface Member {
  id: string;
  full_name: string;
  birth_date: string;
  baptism_date: string;
  baptism_church: string;
  phone: string;
  email: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  profession: string;
  marital_status: string;
  marriage_certificate_url?: string;
  identification_url?: string;
  pastoral_interviewer: string;
  belongs_to_gc: boolean;
  wants_to_volunteer: boolean;
  created_at: string;
}

interface MemberDetailsModalProps {
  member: Member;
  onClose: () => void;
}

export function MemberDetailsModal({ member, onClose }: MemberDetailsModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    try {
      const filename = `membro-${member.full_name.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      await generatePDF(contentRef.current, filename);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    }
  };

  return (
    <S.Overlay>
      <S.Container>
        <S.Header>
          <S.Title>Detalhes da submissão ({formatDate(member.created_at)})</S.Title>
          <S.HeaderActions>
            <S.ActionButton onClick={handleDownloadPDF} title="Baixar PDF">
              <Download size={20} />
            </S.ActionButton>
            <S.CloseButton onClick={onClose}>
              <X size={24} />
            </S.CloseButton>
          </S.HeaderActions>
        </S.Header>

        <S.Content ref={contentRef}>
          <S.Subtitle>Respondente (Hóspede) - ID de Envio ({member.id})</S.Subtitle>

          <S.DetailsGrid>
            <S.DetailItem>
              <S.DetailNumber>1.</S.DetailNumber>
              <S.DetailLabel>Nome completo</S.DetailLabel>
              <S.DetailValue>{member.full_name}</S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailNumber>2.</S.DetailNumber>
              <S.DetailLabel>Data de Nascimento</S.DetailLabel>
              <S.DetailValue>{formatDate(member.birth_date)}</S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailNumber>3.</S.DetailNumber>
              <S.DetailLabel>Data de Batismo</S.DetailLabel>
              <S.DetailValue>{formatDate(member.baptism_date)}</S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailNumber>4.</S.DetailNumber>
              <S.DetailLabel>Igreja em que foi batizado:</S.DetailLabel>
              <S.DetailValue>{member.baptism_church}</S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailNumber>5.</S.DetailNumber>
              <S.DetailLabel>Número de telefone</S.DetailLabel>
              <S.DetailValue>{member.phone}</S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailNumber>6.</S.DetailNumber>
              <S.DetailLabel>E-mail</S.DetailLabel>
              <S.DetailValue>{member.email}</S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailNumber>7.</S.DetailNumber>
              <S.DetailLabel>Endereço</S.DetailLabel>
              <S.DetailValue>
                {member.street}, {member.number}
                {member.complement && ` - ${member.complement}`}
                {member.neighborhood} {member.city} {member.state}
                CEP: {member.cep}
              </S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailNumber>8.</S.DetailNumber>
              <S.DetailLabel>Profissão ou Ocupação:</S.DetailLabel>
              <S.DetailValue>{member.profession}</S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailNumber>9.</S.DetailNumber>
              <S.DetailLabel>Estado Civil</S.DetailLabel>
              <S.DetailValue>{member.marital_status}</S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailNumber>10.</S.DetailNumber>
              <S.DetailLabel>Certidão de Casamento</S.DetailLabel>
              <S.DetailValue>
                {member.marriage_certificate_url && (
                  <S.DocumentLink 
                    href={member.marriage_certificate_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Ver Certidão
                  </S.DocumentLink>
                )}
              </S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailNumber>11.</S.DetailNumber>
              <S.DetailLabel>RG ou CNH</S.DetailLabel>
              <S.DetailValue>
                {member.identification_url && (
                  <S.DocumentLink 
                    href={member.identification_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Ver Documento
                  </S.DocumentLink>
                )}
              </S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailNumber>12.</S.DetailNumber>
              <S.DetailLabel>Quem realizou a sua entrevista pastoral?</S.DetailLabel>
              <S.DetailValue>{member.pastoral_interviewer}</S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailNumber>13.</S.DetailNumber>
              <S.DetailLabel>Pertence ao GC:</S.DetailLabel>
              <S.DetailValue>{member.belongs_to_gc ? 'Sim' : 'Não'}</S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailNumber>14.</S.DetailNumber>
              <S.DetailLabel>Deseja participar do Giro de Voluntários?</S.DetailLabel>
              <S.DetailValue>{member.wants_to_volunteer ? 'Sim' : 'Não'}</S.DetailValue>
            </S.DetailItem>
          </S.DetailsGrid>
        </S.Content>
      </S.Container>
    </S.Overlay>
  );
}

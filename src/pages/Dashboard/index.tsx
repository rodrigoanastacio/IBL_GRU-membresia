import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { getMembers } from "../../services/member";
import * as S from "./styles";

export function Dashboard() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const data = await getMembers();
      setMembers(data);
    } catch (error) {
      console.error("Error loading members:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.full_name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMembers = filteredMembers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Dashboard de Membros</S.Title>
        <S.SearchContainer>
          <Search size={20} />
          <S.SearchInput
            type="text"
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </S.SearchContainer>
      </S.Header>

      {loading ? (
        <S.LoadingMessage>Carregando...</S.LoadingMessage>
      ) : (
        <>
          <S.Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th>Certidão de Casamento</th>
                <th>Documento de Identificação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMembers.map((member) => (
                <tr key={member.id}>
                  <td>{member.full_name}</td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>{member.city}</td>
                  <td>
                    {member.marriage_certificate_url && (
                      <a
                        href={member.marriage_certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Ver Certidão
                      </a>
                    )}
                  </td>
                  <td>
                    {member.identification_url && (
                      <a
                        href={member.identification_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Ver Documento
                      </a>
                    )}
                  </td>
                  <td>
                    <S.ActionButton onClick={() => setSelectedMember(member)}>
                      <Eye size={18} />
                    </S.ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </S.Table>

          <S.Pagination>
            <S.PaginationButton
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={20} />
            </S.PaginationButton>
            <S.PageInfo>
              Página {currentPage} de {totalPages}
            </S.PageInfo>
            <S.PaginationButton
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={20} />
            </S.PaginationButton>
          </S.Pagination>
        </>
      )}

      {selectedMember && (
        <S.Modal>
          <S.ModalContent>
            <S.ModalHeader>
              <h2>Detalhes do Membro</h2>
              <S.CloseButton onClick={() => setSelectedMember(null)}>
                ×
              </S.CloseButton>
            </S.ModalHeader>
            <S.ModalBody>
              <S.DetailGroup>
                <S.DetailLabel>Nome Completo:</S.DetailLabel>
                <S.DetailValue>{selectedMember.full_name}</S.DetailValue>
              </S.DetailGroup>
              <S.DetailGroup>
                <S.DetailLabel>Data de Nascimento:</S.DetailLabel>
                <S.DetailValue>
                  {new Date(selectedMember.birth_date).toLocaleDateString()}
                </S.DetailValue>
              </S.DetailGroup>
              <S.DetailGroup>
                <S.DetailLabel>Data de Batismo:</S.DetailLabel>
                <S.DetailValue>
                  {new Date(selectedMember.baptism_date).toLocaleDateString()}
                </S.DetailValue>
              </S.DetailGroup>
              <S.DetailGroup>
                <S.DetailLabel>Igreja do Batismo:</S.DetailLabel>
                <S.DetailValue>{selectedMember.baptism_church}</S.DetailValue>
              </S.DetailGroup>
              <S.DetailGroup>
                <S.DetailLabel>Contato:</S.DetailLabel>
                <S.DetailValue>
                  {selectedMember.phone} | {selectedMember.email}
                </S.DetailValue>
              </S.DetailGroup>
              <S.DetailGroup>
                <S.DetailLabel>Endereço:</S.DetailLabel>
                <S.DetailValue>
                  {selectedMember.street}, {selectedMember.number}
                  {selectedMember.complement &&
                    ` - ${selectedMember.complement}`}
                  <br />
                  {selectedMember.neighborhood} - {selectedMember.city}/
                  {selectedMember.state}
                  <br />
                  CEP: {selectedMember.cep}
                </S.DetailValue>
              </S.DetailGroup>
              <S.DetailGroup>
                <S.DetailLabel>Profissão:</S.DetailLabel>
                <S.DetailValue>{selectedMember.profession}</S.DetailValue>
              </S.DetailGroup>
              <S.DetailGroup>
                <S.DetailLabel>Estado Civil:</S.DetailLabel>
                <S.DetailValue>{selectedMember.marital_status}</S.DetailValue>
              </S.DetailGroup>
              <S.DetailGroup>
                <S.DetailLabel>Entrevistador Pastoral:</S.DetailLabel>
                <S.DetailValue>
                  {selectedMember.pastoral_interviewer}
                </S.DetailValue>
              </S.DetailGroup>
              <S.DetailGroup>
                <S.DetailLabel>Participação:</S.DetailLabel>
                <S.DetailValue>
                  {selectedMember.belongs_to_gc && "• Pertence ao GC"}
                  {selectedMember.belongs_to_gc &&
                    selectedMember.wants_to_volunteer &&
                    " | "}
                  {selectedMember.wants_to_volunteer && "• Voluntário"}
                </S.DetailValue>
              </S.DetailGroup>
            </S.ModalBody>
          </S.ModalContent>
        </S.Modal>
      )}
    </S.Container>
  );
}

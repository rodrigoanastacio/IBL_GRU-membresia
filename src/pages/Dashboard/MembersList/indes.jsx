import { useEffect, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Users,
  UserPlus,
  UserCheck,
  Trash2,
  Trash,
} from "lucide-react";
import { getMembers, deleteMember } from "./../../../services/member";
import * as S from "./../styles";
import "./styles.scss";
import { MemberDetailsModal } from "../../../components/MemberDetailsModal";
import { ConfirmationModal } from "../../../components/ConfirmationModal";

export const MembersList = () => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
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

  const handleDeleteMember = async () => {
    if (!memberToDelete) return;

    try {
      setIsDeleting(true);
      console.log("Iniciando exclusão do membro:", memberToDelete.id);

      const success = await deleteMember(memberToDelete.id);

      if (success) {
        console.log("Membro excluído com sucesso");
        // Atualizar a lista localmente
        setMembers((prev) => prev.filter((m) => m.id !== memberToDelete.id));
        setMemberToDelete(null);

        // Recarregar a lista do servidor
        console.log("Recarregando lista de membros...");
        await loadMembers();
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      // Aqui você pode adicionar uma notificação de erro
    } finally {
      setIsDeleting(false);
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
    <section className="l-members-list">
      <header className="l-members-list__header">
        <div className="l-members-list__headline">
          <h2 className="l-members-list__title">Membresia</h2>
          <p className="l-members-list__subtitle">
            Gerencie e monitore os membros da igreja
          </p>
        </div>
        <S.SearchContainer>
          <Search size={20} />
          <S.SearchInput
            type="text"
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* TODO: Analizar um local melhor para implementar essa funcionalidade. Para não correr risco de usuário apagar por engano todos os arquivos. */}
          {/* <S.CleanupButton
              onClick={() => setShowCleanupConfirm(true)}
              title="Limpar arquivos não utilizados"
            >
              <Trash size={20} />
            </S.CleanupButton> */}
        </S.SearchContainer>
      </header>

      {loading ? (
        <S.LoadingContainer>
          <S.LoadingSpinner />
          <S.LoadingMessage>Carregando dados...</S.LoadingMessage>
        </S.LoadingContainer>
      ) : (
        <S.TableContainer>
          <S.TableHeader>
            <S.TableTitle>Lista de Membros</S.TableTitle>
            <S.TableDescription>
              {filteredMembers.length} membros encontrados
            </S.TableDescription>
          </S.TableHeader>

          <S.TableWrapper>
            <S.Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Cidade</th>
                  <th>Status GC</th>
                  <th>GC Selecionado</th>
                  <th>Documentos</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {paginatedMembers.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <S.MemberName>{member.full_name}</S.MemberName>
                    </td>
                    <td>{member.email}</td>
                    <td>{member.phone}</td>
                    <td>{member.city}</td>
                    <td>
                      <S.StatusBadge active={member.belongs_to_gc}>
                        {member.belongs_to_gc ? "Ativo" : "Inativo"}
                      </S.StatusBadge>
                    </td>
                    <td>{member.gc_name || "-"}</td>
                    <td>
                      <S.DocumentBadges>
                        {member.marriage_certificate_url && (
                          <S.DocumentBadge title="Certidão de Casamento">
                            Certidão
                          </S.DocumentBadge>
                        )}
                        {member.identification_url && (
                          <S.DocumentBadge title="Documento de Identificação">
                            RG/CNH
                          </S.DocumentBadge>
                        )}
                      </S.DocumentBadges>
                    </td>
                    <td>
                      <S.ActionButtons>
                        <S.ActionButton
                          onClick={() => setSelectedMember(member)}
                          title="Ver detalhes"
                        >
                          <Eye size={18} />
                        </S.ActionButton>
                        <S.ActionButton
                          onClick={() => setMemberToDelete(member)}
                          title="Excluir membro"
                          className="delete"
                        >
                          <Trash2 size={18} />
                        </S.ActionButton>
                      </S.ActionButtons>
                    </td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </S.TableWrapper>

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
        </S.TableContainer>
      )}

      {selectedMember && (
        <MemberDetailsModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      <ConfirmationModal
        isOpen={!!memberToDelete}
        title="Excluir membro"
        message={`Tem certeza que deseja excluir o membro "${memberToDelete?.full_name}"? Esta ação não poderá ser desfeita e todos os documentos associados serão removidos.`}
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onConfirm={handleDeleteMember}
        onCancel={() => setMemberToDelete(null)}
        isLoading={isDeleting}
      />
    </section>
  );
};

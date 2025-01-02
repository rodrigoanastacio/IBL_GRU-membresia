import { useState, useEffect } from "react";
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
import { useClerk, useUser } from "@clerk/clerk-react";
import { getMembers, deleteMember } from "../../services/member";
import { cleanupOrphanedFiles } from "../../services/storage";
import { MemberDetailsModal } from "../../components/MemberDetailsModal";
import { StorageUsageCard } from "../../components/StorageUsageCard";
import { StatsCard } from "../../components/StatsCard";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import * as S from "./styles";

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
  gc_name?: string;
  wants_to_volunteer: boolean;
  created_at: string;
}

export function Dashboard() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCleaningStorage, setIsCleaningStorage] = useState(false);
  const [showCleanupConfirm, setShowCleanupConfirm] = useState(false);
  const itemsPerPage = 10;

  const { user } = useUser();
  const { signOut } = useClerk();

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

  const handleCleanupStorage = async () => {
    try {
      setIsCleaningStorage(true);
      const result = await cleanupOrphanedFiles();
      console.log("Resultado da limpeza:", result);

      // Recarregar dados após limpeza
      await loadMembers();
      setShowCleanupConfirm(false);
    } catch (error) {
      console.error("Erro ao limpar storage:", error);
    } finally {
      setIsCleaningStorage(false);
    }
  };

  const handleLogout = () => {
    signOut();
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

  // Calcular estatísticas
  const totalMembers = members.length;
  const newMembersThisMonth = members.filter((member) => {
    const memberDate = new Date(member.created_at);
    const today = new Date();
    return (
      memberDate.getMonth() === today.getMonth() &&
      memberDate.getFullYear() === today.getFullYear()
    );
  }).length;

  const activeMembers = members.filter((member) => member.belongs_to_gc).length;

  return (
    <S.Container>
      <S.Header>
        <div>
          <S.Title>Dashboard de Membros</S.Title>
          <S.Subtitle>Gerencie e monitore os membros da igreja</S.Subtitle>
        </div>
        <S.SearchContainer>
          <Search size={20} />
          <S.SearchInput
            type="text"
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <S.CleanupButton
            onClick={() => setShowCleanupConfirm(true)}
            title="Limpar arquivos não utilizados"
          >
            <Trash size={20} />
          </S.CleanupButton>
        </S.SearchContainer>
        <S.LogoutButton onClick={handleLogout}>Sair</S.LogoutButton>
      </S.Header>

      <S.StatsGrid>
        <StorageUsageCard />
        <StatsCard
          title="Total de Membros"
          value={totalMembers}
          description="Total de membros cadastrados"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Novos Membros"
          value={newMembersThisMonth}
          description="Novos membros este mês"
          icon={UserPlus}
          color="green"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Membros Ativos"
          value={activeMembers}
          description="Membros participando de GCs"
          icon={UserCheck}
          color="yellow"
        />
      </S.StatsGrid>

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

      <ConfirmationModal
        isOpen={showCleanupConfirm}
        title="Limpar Storage"
        message="Tem certeza que deseja remover todos os arquivos não vinculados a membros? Esta ação não poderá ser desfeita."
        confirmLabel="Limpar"
        cancelLabel="Cancelar"
        onConfirm={handleCleanupStorage}
        onCancel={() => setShowCleanupConfirm(false)}
        isLoading={isCleaningStorage}
      />
    </S.Container>
  );
}

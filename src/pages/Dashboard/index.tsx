import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, Eye, Users, UserPlus, UserCheck, HardDrive } from "lucide-react";
import { getMembers } from "../../services/member";
import { MemberDetailsModal } from "../../components/MemberDetailsModal";
import { StorageUsageCard } from "../../components/StorageUsageCard";
import { StatsCard } from "../../components/StatsCard";
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

  // Calcular estatísticas
  const totalMembers = members.length;
  const newMembersThisMonth = members.filter(member => {
    const memberDate = new Date(member.created_at);
    const today = new Date();
    return memberDate.getMonth() === today.getMonth() && 
           memberDate.getFullYear() === today.getFullYear();
  }).length;

  const activeMembers = members.filter(member => member.belongs_to_gc).length;

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
        </S.SearchContainer>
      </S.Header>

      <S.StatsGrid>
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
        <StorageUsageCard />
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

          <S.Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th>Status GC</th>
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
                      {member.belongs_to_gc ? 'Ativo' : 'Inativo'}
                    </S.StatusBadge>
                  </td>
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
                    <S.ActionButton onClick={() => setSelectedMember(member)} title="Ver detalhes">
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
        </S.TableContainer>
      )}

      {selectedMember && (
        <MemberDetailsModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </S.Container>
  );
}

import { useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { cleanupOrphanedFiles } from "../../services/storage";
import { StorageUsageCard } from "../../components/StorageUsageCard";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import * as S from "./styles";

export function Dashboard() {
  const [isCleaningStorage, setIsCleaningStorage] = useState(false);
  const [showCleanupConfirm, setShowCleanupConfirm] = useState(false);

  // const { user } = useUser();
  const { signOut } = useClerk();

  // console.log("User:::: ", user.firstName);

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

  return (
    <S.Container>
      <S.Header>
        {/* <S.Wrapper> */}

        {/* TODO: Analizar um local melhor para implementar essa funcionalidade. Para não correr risco de usuário apagar por engano todos os arquivos. */}
        {/* <S.CleanupButton
              onClick={() => setShowCleanupConfirm(true)}
              title="Limpar arquivos não utilizados"
            >
              <Trash size={20} />
            </S.CleanupButton> */}
        {/* </S.SearchContainer> */}
        {/* </S.Wrapper> */}
      </S.Header>

      <S.StatsGrid>
        <StorageUsageCard />
      </S.StatsGrid>

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

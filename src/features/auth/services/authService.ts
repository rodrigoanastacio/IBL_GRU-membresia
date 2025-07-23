import supabase from "../../../utils/supabase";

export const authService = {
  async login(email: string, password: string) {
    console.log("🔐 Tentando login:", email);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("📊 Resultado:", { data, error });

      if (error) {
        console.error("❌ Erro:", error);
        return { user: null, error: error.message };
      }

      console.log("✅ Sucesso:", data.user);
      return { user: data.user, error: null };
    } catch (error: any) {
      console.error("💥 Erro inesperado:", error);
      return { user: null, error: error.message };
    }
  },

  async logout() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("❌ Erro no logout:", error);
        throw error;
      }

      console.log("✅ Logout realizado com sucesso");
    } catch (error: any) {
      console.error("💥 Erro inesperado no logout:", error);
      throw error;
    }
  },
};

// Manter a função antiga para compatibilidade
export const loginUser = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
};

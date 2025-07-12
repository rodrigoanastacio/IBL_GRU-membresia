import { supabase } from "../lib/supabase";

/**
 * Interface que define a estrutura de um GC
 */
export interface GC {
  id?: string;
  title: string;
  leader_name: string; // Campo correto no Supabase
  leader_contact: string;
  contact: string; // Campo legado, ainda usado no banco
  co_leader_name?: string; // Nome do co-líder (com underscore)
  co_leader_contact?: string; // Contato do co-líder (com underscore)
  weekday: string; // Era "day"
  time: string;
  is_online: boolean;
  is_couple: boolean;
  address?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  created_at?: string;
}

/**
 * Cria um novo GC no Supabase
 * @param gcData Dados do GC a ser criado
 * @returns O GC criado ou null em caso de erro
 */
export async function createGC(gcData: Omit<GC, "id" | "created_at">) {
  try {
    console.log("🏠 Iniciando criação de GC:", gcData.title);

    const { data, error } = await supabase
      .from("gcs")
      .insert([gcData])
      .select();

    if (error) {
      console.error("❌ Erro ao criar GC:", error);
      throw error;
    }

    console.log("✅ GC criado com sucesso:", data[0]);
    return data[0];
  } catch (error) {
    console.error("❌ Erro ao processar criação de GC:", error);
    throw error;
  }
}

/**
 * Busca todos os GCs
 * @returns Lista de GCs
 */
export async function getGCs() {
  try {
    console.log("🔍 Buscando todos os GCs");

    const { data, error } = await supabase
      .from("gcs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Erro ao buscar GCs:", error);
      throw error;
    }

    console.log("✅ GCs encontrados:", data?.length || 0);
    return data || [];
  } catch (error) {
    console.error("❌ Erro ao processar busca de GCs:", error);
    throw error;
  }
}

/**
 * Busca um GC pelo ID
 * @param id ID do GC
 * @returns O GC encontrado ou null
 */
export async function getGCById(id: string) {
  try {
    console.log("🔍 Buscando GC por ID:", id);

    const { data, error } = await supabase
      .from("gcs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("❌ Erro ao buscar GC:", error);
      throw error;
    }

    console.log("✅ GC encontrado:", data);
    return data;
  } catch (error) {
    console.error("❌ Erro ao processar busca de GC:", error);
    throw error;
  }
}

/**
 * Atualiza um GC existente
 * @param id ID do GC a ser atualizado
 * @param gcData Novos dados do GC
 * @returns O GC atualizado ou null
 */
export async function updateGC(id: string, gcData: Partial<GC>) {
  try {
    console.log("🔄 Atualizando GC:", id);

    const { data, error } = await supabase
      .from("gcs")
      .update(gcData)
      .eq("id", id)
      .select();

    if (error) {
      console.error("❌ Erro ao atualizar GC:", error);
      throw error;
    }

    console.log("✅ GC atualizado com sucesso:", data[0]);
    return data[0];
  } catch (error) {
    console.error("❌ Erro ao processar atualização de GC:", error);
    throw error;
  }
}

/**
 * Deleta um GC pelo ID
 * @param id ID do GC a ser deletado
 * @returns true se deletado com sucesso
 */
export async function deleteGC(id: string) {
  try {
    console.log("🗑️ Deletando GC:", id);

    const { error } = await supabase.from("gcs").delete().eq("id", id);

    if (error) {
      console.error("❌ Erro ao deletar GC:", error);
      throw error;
    }

    console.log("✅ GC deletado com sucesso");
    return true;
  } catch (error) {
    console.error("❌ Erro ao processar deleção de GC:", error);
    throw error;
  }
}

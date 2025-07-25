import { supabase } from '../lib/supabase'

/**
 * Serviço para gerenciar operações CRUD de Grupos Conectados (GCs)
 */

/**
 * Interface que define a estrutura de um GC
 */
export interface GC {
  id?: string
  title: string
  leader_name: string
  leader_contact: string
  contact: string
  co_leader_name?: string
  co_leader_contact?: string
  weekday: string
  time: string
  is_online: boolean
  is_couple: boolean
  address?: string
  street?: string
  number?: string
  neighborhood?: string
  city?: string
  state?: string
  country?: string
  created_at?: string
}

/**
 * Cria um novo GC no Supabase
 * @param gcData Dados do GC a ser criado
 * @returns O GC criado ou null em caso de erro
 */
export async function createGC(gcData: Omit<GC, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase.from('gcs').insert([gcData]).select()

    if (error) {
      throw error
    }

    if (!data || data.length === 0) {
      throw new Error('Não foi possível criar o GC')
    }

    return data[0]
  } catch (error) {
    throw error
  }
}

/**
 * Busca todos os GCs ativos
 * @returns Promise<GC[]> Lista de GCs ordenados por data de criação
 */
export async function getGCs() {
  try {
    const { data, error } = await supabase
      .from('gcs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return data || []
  } catch (error) {
    throw error
  }
}

/**
 * Busca um GC pelo ID
 * @param id ID do GC
 * @returns O GC encontrado ou null
 */
export async function getGCById(id: string) {
  try {
    const { data, error } = await supabase
      .from('gcs')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    throw error
  }
}

/**
 * Atualiza um GC existente
 * @param id ID do GC a ser atualizado
 * @param gcData Novos dados do GC
 * @returns O GC atualizado
 */
export async function updateGC(id: string, gcData: Partial<GC>) {
  try {
    const { data, error } = await supabase
      .from('gcs')
      .update(gcData)
      .eq('id', id)
      .select('*')

    if (error) {
      throw error
    }

    if (!data || data.length === 0) {
      // Fallback: buscar o registro atualizado
      const { data: updatedRecord, error: fetchError } = await supabase
        .from('gcs')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) {
        throw new Error(`Erro ao buscar GC atualizado: ${fetchError.message}`)
      }

      return updatedRecord
    }

    return data[0]
  } catch (error) {
    throw error
  }
}

/**
 * Deleta um GC pelo ID
 * @param id ID do GC a ser deletado
 * @returns true se deletado com sucesso
 */
export async function deleteGC(id: string) {
  try {
    const { error } = await supabase.from('gcs').delete().eq('id', id)

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    throw error
  }
}

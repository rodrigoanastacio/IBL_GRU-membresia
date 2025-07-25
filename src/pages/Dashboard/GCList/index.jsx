import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RiAddLine } from 'react-icons/ri'
import { SearchFilter } from '../../../components/SearchFilter'
import { Modal } from '../../../components/Modal'
import { EditGC } from '../EditGC'
import { NewGC } from '../NewGC'
import { getGCs } from '../../../services/gc'
import './styles.scss'

export const GCList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGC, setSelectedGC] = useState(null)
  const [isNewGCModalOpen, setIsNewGCModalOpen] = useState(false)
  const [gcList, setGcList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadGCs()
  }, [])

  const loadGCs = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getGCs()
      setGcList(data || [])
    } catch (err) {
      setError('Não foi possível carregar os GCs. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const filteredGCs = gcList.filter((gc) =>
    gc.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (id) => {
    setSelectedGC(id)
  }

  const handleCloseEditModal = () => {
    setSelectedGC(null)
  }

  const handleCloseNewModal = () => {
    setIsNewGCModalOpen(false)
  }

  const handleGCCreated = (newGC) => {
    // Validar se o novo GC existe
    if (!newGC || !newGC.id) {
      // Recarregar a lista inteira como fallback
      loadGCs()
      return
    }

    // Atualizar a lista com o novo GC
    setGcList((prev) => [newGC, ...prev])
  }

  const handleGCUpdated = (updatedGC) => {
    // Validar se o GC atualizado existe
    if (!updatedGC || !updatedGC.id) {
      // Recarregar a lista inteira como fallback
      loadGCs()
      return
    }

    // Atualizar o GC na lista
    setGcList((prev) =>
      prev.map((gc) => (gc.id === updatedGC.id ? updatedGC : gc))
    )
  }

  return (
    <div className="p-gc-list">
      <div className="p-gc-list__header">
        <h1 className="p-gc-list__title">Lista de GCs</h1>
        <button
          className="p-gc-list__new-button"
          onClick={() => setIsNewGCModalOpen(true)}
        >
          <RiAddLine aria-hidden="true" />
          <span>Novo GC</span>
        </button>
      </div>

      <div className="p-gc-list__filters">
        <SearchFilter onFilterChange={setSearchTerm} />
      </div>

      <div className="p-gc-list__table">
        {loading ? (
          <div className="p-gc-list__loading">Carregando GCs...</div>
        ) : error ? (
          <div className="p-gc-list__error">{error}</div>
        ) : filteredGCs.length === 0 ? (
          <div className="p-gc-list__empty">
            {searchTerm
              ? 'Nenhum GC encontrado com este termo de busca.'
              : 'Nenhum GC cadastrado ainda.'}
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Líderes</th>
                <th>Horário</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredGCs.map((gc) => (
                <motion.tr
                  key={gc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td>{gc.title}</td>
                  <td>{gc.leader_name}</td>
                  <td>
                    {gc.weekday} às {gc.time}
                  </td>
                  <td>{gc.is_online ? 'Online' : 'Presencial'}</td>
                  <td>
                    <button
                      className="p-gc-list__button"
                      onClick={() => handleEdit(gc.id)}
                    >
                      Editar
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        isOpen={!!selectedGC}
        onClose={handleCloseEditModal}
        title="Editar GC"
      >
        <EditGC
          id={selectedGC}
          onClose={handleCloseEditModal}
          onSuccess={handleGCUpdated}
        />
      </Modal>

      <Modal
        isOpen={isNewGCModalOpen}
        onClose={handleCloseNewModal}
        title="Novo GC"
      >
        <NewGC onClose={handleCloseNewModal} onSuccess={handleGCCreated} />
      </Modal>
    </div>
  )
}

import { useState } from "react";
import { motion } from "framer-motion";
import { RiAddLine } from "react-icons/ri";
import { items } from "../../../data/items";
import { SearchFilter } from "../../../components/SearchFilter";
import { Modal } from "../../../components/Modal";
import { EditGC } from "../EditGC";
import { NewGC } from "../NewGC";
import "./styles.scss";

export const GCList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGC, setSelectedGC] = useState(null);
  const [isNewGCModalOpen, setIsNewGCModalOpen] = useState(false);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    setSelectedGC(id);
  };

  const handleCloseEditModal = () => {
    setSelectedGC(null);
  };

  const handleCloseNewModal = () => {
    setIsNewGCModalOpen(false);
  };

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
            {filteredItems.map((item) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td>{item.title}</td>
                <td>{item.leaders}</td>
                <td>
                  {item.data} às {item.time}
                </td>
                <td>{item.isOnline ? "Online" : "Presencial"}</td>
                <td>
                  <button
                    className="p-gc-list__button"
                    onClick={() => handleEdit(item.id)}
                  >
                    Editar
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={!!selectedGC}
        onClose={handleCloseEditModal}
        title="Editar GC"
      >
        <EditGC id={selectedGC} onClose={handleCloseEditModal} />
      </Modal>

      <Modal
        isOpen={isNewGCModalOpen}
        onClose={handleCloseNewModal}
        title="Novo GC"
      >
        <NewGC onClose={handleCloseNewModal} />
      </Modal>
    </div>
  );
};

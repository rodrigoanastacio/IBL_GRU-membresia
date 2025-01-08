import { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import "./styles.scss";
import { Modal } from "../../../components/DocumentPreview/styles";
import { NewGC } from "../NewGC";
import { EditGC } from "../EditGC";

export const GCList = () => {
  const [selectedGC, setSelectedGC] = useState(null);
  const [isNewGCModalOpen, setIsNewGCModalOpen] = useState(false);

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
        {/* <SearchFilter onFilterChange={setSearchTerm} /> */}
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
            {/* {filteredItems.map((item) => ( */}
            <tr>
              <td>Title</td>
              <td>leaders</td>
              <td>{/* {item.data} às {item.time} */}</td>
              <td></td>
              <td>
                <button className="p-gc-list__button">Editar</button>
              </td>
            </tr>
            {/* ))} */}
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

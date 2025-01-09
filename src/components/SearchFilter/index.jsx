import { motion } from "framer-motion";
import "./styles.scss";

export const SearchFilter = ({ onFilterChange }) => {
  return (
    <motion.div
      className="c-search"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="text"
        placeholder="Buscar GC por nome..."
        onChange={(e) => onFilterChange(e.target.value)}
        className="c-search__input"
      />
    </motion.div>
  );
};

import { motion, AnimatePresence } from "framer-motion";
import { RiArrowLeftLine } from "react-icons/ri";
import { useEffect, useRef } from "react";
import "./styles.scss";

export const Modal = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      modalRef.current?.focus();
      document.body.style.overflow = "hidden";

      const handleEscape = (event) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  const handleTabKey = (e) => {
    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="c-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          ref={modalRef}
          tabIndex={-1}
          onKeyDown={handleTabKey}
        >
          <motion.div
            className="c-modal__header"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <button
              onClick={onClose}
              className="c-modal__back"
              aria-label="Voltar para a lista de GCs"
            >
              <RiArrowLeftLine aria-hidden="true" />
              <span>Voltar</span>
            </button>
          </motion.div>
          <motion.div
            className="c-modal__content"
            role="document"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 id="modal-title" className="sr-only">
              {title}
            </h2>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

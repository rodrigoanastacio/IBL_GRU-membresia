import React, { useState } from "react";
import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";

import "./styles.scss";

interface SubmenuProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const Submenu = ({ title, icon, children }: SubmenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubmenu = () => setIsOpen(!isOpen);

  return (
    <div className="c-submenu">
      <button
        className="c-submenu__header"
        onClick={toggleSubmenu}
        aria-expanded={isOpen}
        aria-controls={`submenu-${title}`}
      >
        <div className="c-submenu__icon">{icon}</div>
        <span className="c-submenu__title">{title}</span>
        <div className="c-submenu__arrow">
          {isOpen ? <RiArrowDownSLine /> : <RiArrowRightSLine />}
        </div>
      </button>
      {isOpen && (
        <div id={`submenu-${title}`} className="c-submenu__content">
          {children}
        </div>
      )}
    </div>
  );
};

import { NavLink } from "react-router-dom";
import {
  RiDashboardLine,
  RiGroupLine,
  RiLogoutBoxLine,
  RiSettings4Line,
} from "react-icons/ri";

import "./styles.scss";

export const Sidebar = ({ onLinkClick }) => {
  const handleClick = () => {
    if (onLinkClick) onLinkClick();
  };

  return (
    <aside className="c-sidebar">
      <div className="c-sidebar__logo">
        <img src="/logo-lagoinha-white.svg" alt="Logo GC" />
      </div>
      <nav className="c-sidebar__nav" role="navigation">
        <div className="c-sidebar__section">
          <span className="c-sidebar__section-title">Menu</span>
          <NavLink
            to="/dashboard"
            className="c-sidebar__link"
            end
            onClick={handleClick}
          >
            <RiDashboardLine aria-hidden="true" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/dashboard/gcs"
            className="c-sidebar__link"
            onClick={handleClick}
          >
            <RiGroupLine aria-hidden="true" />
            <span>GCs</span>
          </NavLink>
        </div>

        <div className="c-sidebar__section">
          <span className="c-sidebar__section-title">Gerenciar</span>
        </div>

        <div className="c-sidebar__section">
          <span className="c-sidebar__section-title">Sistema</span>
          <NavLink
            to="/dashboard/settings"
            className="c-sidebar__link"
            onClick={handleClick}
          >
            <RiSettings4Line aria-hidden="true" />
            <span>Configurações</span>
          </NavLink>
        </div>
      </nav>

      <button className="c-sidebar__logout">
        <RiLogoutBoxLine />
        <span>Sair</span>
      </button>
    </aside>
  );
};

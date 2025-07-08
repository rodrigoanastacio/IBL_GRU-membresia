import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { PiUsersThreeLight } from "react-icons/pi";
import { MdMapsHomeWork } from "react-icons/md";

import {
  RiExternalLinkFill,
  RiDashboardLine,
  RiDashboard3Fill,
  RiLogoutBoxLine,
  RiSettings4Line,
} from "react-icons/ri";

import { Submenu } from "../../Submenu";

import "./styles.scss";

export const Sidebar = ({ isMobile, onLinkClick }) => {
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleClick = () => {
    if (isMobile && onLinkClick) {
      onLinkClick();
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside className={`c-sidebar ${isMobile ? "c-sidebar--mobile" : ""}`}>
      <div className="c-sidebar__logo">
        <img src="/logo-lagoinha-white.svg" alt="Logo GC" />
      </div>

      <nav className="c-sidebar__nav" role="navigation">
        <div className="c-sidebar__section">
          <span className="c-sidebar__section-title">Páginas</span>
          <NavLink
            to="../encontrar-gc"
            className="c-sidebar__link"
            end
            onClick={handleClick}
          >
            <RiExternalLinkFill aria-hidden="true" />
            <span>Encontrar GC</span>
          </NavLink>

          <NavLink
            to="../"
            className="c-sidebar__link"
            end
            onClick={handleClick}
          >
            <RiExternalLinkFill aria-hidden="true" />
            <span>Ficha de Membros</span>
          </NavLink>
        </div>

        <div className="c-sidebar__section">
          <span className="c-sidebar__section-title">Gerenciar</span>
          <Submenu title="Dashboard" icon={<RiDashboard3Fill />}>
            <NavLink
              to="/dashboard"
              className="c-sidebar__link"
              end
              onClick={handleClick}
            >
              <span>Visão Geral</span>
            </NavLink>
            <NavLink
              to="/dashboard/metrics"
              className="c-sidebar__link"
              onClick={handleClick}
            >
              <span>Métricas</span>
            </NavLink>
          </Submenu>

          <NavLink
            to="/dashboard/gcs"
            className="c-sidebar__link"
            onClick={handleClick}
          >
            <MdMapsHomeWork aria-hidden="true" />
            <span>GCs</span>
          </NavLink>

          <NavLink
            to="/dashboard/membros"
            className="c-sidebar__link"
            end
            onClick={handleClick}
          >
            <PiUsersThreeLight aria-hidden="true" />
            <span>Membresia</span>
          </NavLink>
        </div>

        <div className="c-sidebar__section">
          <span className="c-sidebar__section-title">Ministérios</span>

          <Submenu title="Consolidação" icon={<RiDashboardLine />}>
            <NavLink
              to="/dashboard/consolidacao/formulario-sala"
              className="c-sidebar__link"
              end
              onClick={handleClick}
            >
              <span>Ficha Sala</span>
            </NavLink>
          </Submenu>
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

      <button
        className="c-sidebar__logout"
        onClick={handleLogout}
        disabled={isLoggingOut}
        title="Sair"
      >
        <RiLogoutBoxLine />
        <span>{isLoggingOut ? "Saindo..." : "Sair"}</span>
      </button>
    </aside>
  );
};

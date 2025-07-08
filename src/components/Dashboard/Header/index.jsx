// import { useUser } from "@clerk/clerk-react";
import { RiNotificationLine, RiMenuLine } from "react-icons/ri";
import "./styles.scss";

export const Header = ({ onToggleSidebar }) => {
  // const { user } = useUser();

  return (
    <header className="c-dashboard-header">
      <div className="c-dashboard-header__content">
        <button
          className="c-dashboard-header__menu-button"
          onClick={onToggleSidebar}
          aria-label="Menu"
        >
          <RiMenuLine />
        </button>

        <div className="c-dashboard-header__actions">
          <button
            className="c-dashboard-header__button"
            aria-label="Notificações"
          >
            <RiNotificationLine />
            <span className="c-dashboard-header__notification-badge">2</span>
          </button>

          <div className="c-dashboard-header__profile">
            <img
              // src={user.imageUrl}
              alt="Foto do usuário"
              className="c-dashboard-header__avatar"
            />
            <div className="c-dashboard-header__user-info">
              <span className="c-dashboard-header__user-name">
                {/* {user.fullName} */}
              </span>
              <span className="c-dashboard-header__user-role">
                {/* {user.organizationMemberships[0].role} */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

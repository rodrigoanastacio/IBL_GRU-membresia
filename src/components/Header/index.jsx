// import logo from "./lagoinha-guarulhos.svg";

import { Headline } from "../Headline";

export const Header = () => {
  return (
    <header className="l-header">
      <div className="l-header__container">
        <div className="l-header__brand">
          <img
            className="l-header__logo"
            src="/lagoinha-guarulhos.svg"
            alt="Lagoinha Guarulhos"
          />

          <img className="l-header__logo" src="/logo-gc.svg" alt="Logo GC" />
        </div>

        <div className="l-header__headline">
          <Headline title="Encontre um GC mais próximo de você!" />
        </div>
      </div>
    </header>
  );
};

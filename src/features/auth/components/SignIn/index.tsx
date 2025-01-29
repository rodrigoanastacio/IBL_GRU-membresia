import "./styles.scss";

export const SignIn = () => {
  return (
    <>
      <form className="c-form">
        <div className="c-form__header">
          <h2 className="c-form__title">Acessar o Painel</h2>
          <p className="subtitle">
            Gerencie e acompanhe todas as suas informações no painel de gestão.
          </p>
        </div>
        <div className="c-form__group">
          <label htmlFor="email" className="c-form__label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            required
            placeholder="Digite seu email"
            aria-required="true"
            className="c-form__input"
          />
        </div>

        <div className="c-form__group">
          <label htmlFor="email" className="c-form__label">
            Senha
          </label>
          <input
            type="password"
            id="email"
            name="email"
            autoComplete="email"
            required
            placeholder="Digite seu email"
            aria-required="true"
            className="c-form__input"
          />
        </div>

        <button
          type="submit"
          className="c-form__button"
          aria-label="Entrar no sistema"
          disabled={false}
        >
          Entrar
        </button>
      </form>
    </>
  );
};

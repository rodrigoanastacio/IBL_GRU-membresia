import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./styles.scss";

export const SignIn = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="c-form">
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="email"
          required
          placeholder="Digite seu email"
          aria-required="true"
          minLength={5}
          className="c-form__input"
        />
      </div>

      <button
        type="submit"
        className="c-form__button"
        aria-label="Entrar no sistema"
        disabled={loading}
      >
        {loading ? "Carregando..." : "Entrar"}
      </button>
    </form>
  );
};

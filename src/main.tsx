import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.js";
import "./styles/index.scss";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env.local file");
}

const localization = {
  ptBR: {
    signIn: {
      start: {
        title: "Entrar no IBL - GRU",
        subtitle: "Bem-vindo de volta! Por favor, faça login para continuar",
        actionText: "Continuar com o Google",
      },
    },
    socialButtons: {
      continueWithGoogle: "Continuar com o Google", // Tradução do botão
    },
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      localization={localization.ptBR}
    >
      <App />
    </ClerkProvider>
  </StrictMode>
);

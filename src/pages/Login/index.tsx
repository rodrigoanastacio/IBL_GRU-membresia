import { SignIn, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="login-page">
      <div className="login-page__content">
        <SignIn
          path="/login"
          routing="path"
          appearance={{
            elements: {
              cardTitle: "Entrar",
              headerSubtitle:
                "Bem-vindo de volta! Por favor, entre para continuar",
            },
          }}
        />
      </div>
      <div className="login-page__content"></div>
    </div>
  );
};

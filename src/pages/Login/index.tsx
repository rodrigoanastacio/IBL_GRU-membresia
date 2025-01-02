import { SignIn, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import logo from "/lagoinha-gru.png";
import * as S from "./styles";

export const Login = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <S.Container>
      <S.Wrapper>
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
      </S.Wrapper>
      <S.Wrapper>
        <img src={logo} alt="" />
      </S.Wrapper>
    </S.Container>
  );
};

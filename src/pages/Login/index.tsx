// import { SignIn, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import logo from "/lagoinha-gru.png";
import * as S from "./styles";
import { SignIn } from "../../features/auth/components/SignIn";

export const Login = () => {
  // const { isSignedIn } = useAuth();

  // if (isSignedIn) {
  //   return <Navigate to="/dashboard" />;
  // }

  return (
    <S.Container>
      <S.Wrapper>
        <img width={384} src={logo} alt="Logo Lagoinha Guarulhos" />
        {/* <SignIn
          path="/login"
          routing="path"
          forceRedirectUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: "root-custom",
              cardTitle: "Entrar",
              headerSubtitle:
                "Bem-vindo de volta! Por favor, entre para continuar",
            },
          }}
        /> */}
      </S.Wrapper>
      <S.Wrapper>
        <SignIn />
      </S.Wrapper>
    </S.Container>
  );
};

import logo from "/lagoinha-gru.png";
import * as S from "./styles";
import { SignIn } from "../../features/auth/components/SignIn";

export const Login = () => {
  return (
    <S.Container>
      <S.Wrapper>
        <img width={384} src={logo} alt="Logo Lagoinha Guarulhos" />
      </S.Wrapper>
      <S.Wrapper>
        <SignIn />
      </S.Wrapper>
    </S.Container>
  );
};

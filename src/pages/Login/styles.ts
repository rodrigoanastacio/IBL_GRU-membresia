import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
`;

export const Wrapper = styled.div`
  background-color: #000000;
  flex: 1;

  display: none;
  justify-content: center;
  align-items: center;

  @media (min-width: 991px) {
    display: flex;
  }

  & + div {
    background-color: #ffffff;
    padding: 2rem;
    display: flex;

    .c-form {
      width: 100%;
      max-width: 350px;
    }

    img {
      max-width: 580px;
      width: 100%;
      display: block;
    }
  }
`;

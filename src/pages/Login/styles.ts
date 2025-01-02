import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
`;

export const Wrapper = styled.div`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  & + div {
    background-color: #000000;
    display: none;

    img {
      max-width: 580px;
      width: 100%;
      display: block;
    }

    @media (min-width: 991px) {
      display: flex;
    }
  }
`;

import styled from "styled-components";

export const Container = styled.main`
  width: 100vw;
  height: calc(100vh + 15px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  @media screen and (min-width: 700px) {
    padding-top: 2rem;
  }
`;
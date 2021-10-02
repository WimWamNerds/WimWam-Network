import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  padding: 2rem;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme: { bgs } }) => bgs.primary};
  border-bottom: 1px solid ${({ theme: { border } }) => border.primary};
  margin-bottom: 2rem;
  .sun {
    transform: translate(4px, 0px);
  }
  .moon {
    color: #d6d6c2;
    transform: translate(9px, 0px);
  }
  div {
    display: flex;
    align-items: center;
    gap: 5px;
    h2 {
      color: ${({ theme: { fonts } }) => fonts.primary};
    }
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 15px;
  .switch {
    position: fixed;
    z-index: 30;
  }
`;

interface ListProps {
  isMenuOpen: boolean;
}

export const List = styled.ul<ListProps>`
  position: absolute;
  top: calc(100vh - 75vh);
  z-index: 30;
  left: 0;
  height: 50vh;
  border: 1px solid ${({ theme: { border } }) => border.primary};
  border-left: none;
  ${props => (props.isMenuOpen ? '' : 'border: none')};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  ${props => (props.isMenuOpen ? 'width: 5rem' : 'width: 0rem')};
  transition: width 0.5s ease-in-out;
  background: ${({ theme: { bgs } }) => bgs.primary};
  overflow: hidden;
  li {
    position: relative;
    padding: 1rem;
    cursor: pointer;
    .ballon {
      display: none;
    }
    svg {
      color: #ffffff;
      ${props => (props.isMenuOpen ? 'font-size: 1.6rem' : 'font-size: 0')}
    }
  }
  div {
    ${props => (props.isMenuOpen ? 'right: 0' : 'right: 30rem;')};
  }
  @media screen and (min-width: 700px) {
    overflow: unset;
    background: unset;
    position: unset;
    flex-direction: row;
    border: none;
    height: unset;
    width: unset;
    padding: unset;
    li {
      .ballon {
        display: block;
        background: transparent;
        color: transparent;
        transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
        border-radius: 5px;
        padding: 1rem;
        font-size: 1.2rem;
        position: absolute;
        bottom: -4rem;
        right: -0.6rem;
      }
      :hover .ballon {
        background: #333445;
        color: ${({ theme: { fonts } }) => fonts.primary};
      }
      :hover svg {
        opacity: 0.5;
      }
      svg {
        font-size: 1.6rem;
        path {
          width: 1rem;
        }
      }
    }
    div {
      right: 0;
    }
  }
`;

export const Burguer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 700px) {
    display: none;
  }
`;

export const Line = styled.span`
  background: #ffffff;
  width: 15px;
  height: 2px;
  display: block;
  transition: all 0.4s ease-in-out;
  &.close-left {
    transform: translate(0, 7px) rotate(45deg);
  }
  &.close-right {
    transform: rotate(135deg);
  }
  &.fade {
    opacity: 0;
  }
  @media screen and (min-width: 700px) {
    display: none;
  }
`;

export const Alert = styled.div`
  position: absolute;
  top: -5px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    color: ${({ theme: { fonts } }) => fonts.primary};
    font-size: 1rem;
  }
`;

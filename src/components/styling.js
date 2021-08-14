import styled from "styled-components";

export const ButtonContainer = styled.button`
text-transform:capitalize;
font-size:1.4rem;
background:transparent;
border: 0.05rem solid var(--lightBlue);
border-color:${(props) =>
  props.cart ? "var(--mainYellow)" : "var(mainWhite)"};
color:${(prop) => (prop.cart ? "var(--mainYellow)" : "var(--lightBlue)")};
border-radius:1.0rem;
padding:0.3rem 0.1rem;
cursor:pointer;
margin:0.1rem 0.5rem 0.1rem 0rem
transition:all 0.5s ease-in-out;
&:hover{
    background:${(prop) =>
      prop.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
    color:var(--mainBlue);
}
`;

export const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    font-transform: Capital;
    color: var(--mainWhite) !important;
    font-sze: 1.3rem !important;
  }
`;


export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
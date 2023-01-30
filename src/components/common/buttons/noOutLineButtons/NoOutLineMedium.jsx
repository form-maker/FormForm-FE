import React from "react";
import styled from "styled-components";
import fonts from "../../../../styles/fonts";

const NoOutLineMedium = ({ buttonValue, onClick }) => {
  return <Button onClick={onClick}>{buttonValue}</Button>;
};

const Button = styled.button`
  ${fonts.H1}
  padding: 0.5rem 1rem;
  font-size: 2rem;
  line-height: 2.5rem;
  border: none;
  background: transparent;

  @media screen and (max-width: 500px) {
    padding: 0.1rem;
    font-size: 1.5rem;
  }
`;

export default NoOutLineMedium;

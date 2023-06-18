import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 32px 48px;
  background: #000;
  color: #fce571;
  font-weight: 600;
  font-size: 1.2em;
`;

const Header = () => {
  return <StyledHeader>Star Wars Insights</StyledHeader>;
};

export default Header;

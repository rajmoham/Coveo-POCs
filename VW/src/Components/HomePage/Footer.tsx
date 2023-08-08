import React from "react";
import styled from "styled-components";
import { FooterLogo } from "../../config/HomeConfig";
import { Theme } from "../../theme";


const Footer: React.FC = () => {
  return (
    <Wrapper>
      <Logo src={FooterLogo} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: #f6f6f6;
  padding: 32px 0px;
`;

const Logo = styled.img`
height: 50px;
  object-fit: contain;
  margin-left: 20vw;
`;

export default Footer;

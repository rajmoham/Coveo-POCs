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
  background-color: ${Theme.footer};
  padding: 32px 0px;
`;

const Logo = styled.img`
height: 24px;
  object-fit: contain;
  margin-left: 130px;
`;

export default Footer;

import React from "react";
import styled from "styled-components";
import { Theme } from "../../theme";
import WhiteLogo from "../../assets/Logo.jpg";
import FooterLogo from '../../assets/FooterLogo.png'
import Coveo from '../../assets/Coveo.png'


const Footer: React.FC = () => {
  return (
      <Wrapper>
        <Logo src={FooterLogo} />
        <Divider />
        <span style={{fontSize: '12px', textAlign: 'center', marginTop: '50px'}}>Created By Raj Mohammad | Demo for Ammann Group by Coveo</span>
      </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #484c4b;
  padding: 32px 0;
  border-bottom: 2px solid black;
  color: black;
`;

const Divider = styled.div`
  height: 1px;
`;

const Logo = styled.img`
  height: 100px;
  width: 120px;
  margin-left: 100px;
`;

export default Footer;

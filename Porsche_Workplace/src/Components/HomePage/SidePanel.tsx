import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Theme } from '../../theme';
import styled from "styled-components";
import { HeroConfig } from '../../config/HomeConfig';
import { useNavigate } from 'react-router-dom';
import { chevronRight } from 'react-icons-kit/fa/chevronRight';
import { HeaderConfig } from "../../config/HomeConfig";
import { Icon } from "react-icons-kit";
import SidePanelData from "../CustomContext/SidePanelData";
import { CustomContextContext } from "../CustomContext/CustomContextContext";
import { keyframes } from 'styled-components';
import File from '../../assets/file.png';
import Doc from '../../assets/doc.png';
import User from '../../assets/user.png';
import Star from '../../assets/star.png';
import Laptop from '../../assets/laptop.png';
import PorscheLogo from '../../assets/Porsche/Logo.svg'

const SidePanel: React.FC = () => {
  const navigate = useNavigate();
  const { getProfile } = useContext(CustomContextContext);

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };


  return (
    <Main>
      <BrandLogo src={PorscheLogo} />
      <HubLogo>
        <LogoLink href='/'>
          <LogoText>Workplace <br /> Demo</LogoText>
        </LogoLink>
      </HubLogo>
      <SidePanelData />
      <LinkWrapper>
        {HeaderConfig.map((item) => {
          return (
            <NavigationLink key={item.title} href={item.redirectTo}>
              <Wrapper>
                <div style={{ flex: 1 }}><Logo src={item.image} /></div>
                <div style={{ flex: 4 }}><Text>{item.title}</Text></div>
              </Wrapper>
            </NavigationLink>

          );
        })}
        <NavigationLink href='#'>
          <Wrapper>
            <div style={{ flex: 1 }}><Logo src={File} /></div>
            <div style={{ flex: 4 }}><Text>Relevant Files</Text></div>
          </Wrapper></NavigationLink>
        <NavigationLink href='#'><Wrapper>
          <div style={{ flex: 1 }}><Logo src={Doc} /></div>
          <div style={{ flex: 4 }}><Text>Documentation</Text></div>
        </Wrapper></NavigationLink>
        <NavigationLink href='#'><Wrapper>
          <div style={{ flex: 1 }}><Logo src={Star} /></div>
          <div style={{ flex: 4 }}><Text>New Features</Text></div>
        </Wrapper></NavigationLink>
        <NavigationLink href='#'><Wrapper>
          <div style={{ flex: 1 }}><Logo src={User} /></div>
          <div style={{ flex: 4 }}><Text>New People</Text></div>
        </Wrapper></NavigationLink>
        <NavigationLink href='#'><Wrapper>
          <div style={{ flex: 1 }}><Logo src={Laptop} /></div>
          <div style={{ flex: 4 }}><Text>Tools</Text></div>
        </Wrapper></NavigationLink>
      </LinkWrapper>
      <CopyRight>© 2023 Coveo Solutions Inc. All Rights Reserved</CopyRight>
    </Main>
  )
};

const slideIn = keyframes`
0% {
  transform: translateX(-200px);
}
100% {
  transform: translateX(0);
}
`
const BrandLogo = styled.img`
width: 200px;
margin: 40px auto 0;
filter: invert(1);
`

const Logo = styled.img`
height: 20px;
width: 20px;
margin-left: 20px;
padding-bottom: 4px;
filter: invert(0.8);
`

const Wrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding-bottom: 4px;
width: 80%;
margin: 0 auto;
border-bottom: 1px solid #dddddd;
`
const Text = styled.p`
text-align: left;
padding-left: 40px;
`

const Main = styled.div`
position: fixed;
width: 17.5rem;
height: 100vh;
z-index: 3;
transition: 0.3s;
z-index: 9999;
overflow-y: auto;
background: #191F22;
-webkit-animation: ${slideIn} 0.6s forwards;
-webkit-animation-delay: 2s;
animation: ${slideIn} 0.6s forwards;

@media only screen and (max-width: 1350px)
:root {
    width: 14.5rem;
}
`

const HubLogo = styled.div`
margin: 10px 15px 0 5px;
height: 5%;
display: flex;
justify-content: center;
margin-bottom: 40px;
`

const Divider = styled.div`
display: block;
  border-right-width: 2px;
  width: 180px;
  margin-left: 50px;
  height: 1px;
  background: #e5e8e8;
  @media (max-width:1000px) {
    display: none;
  }
`;

const LogoLink = styled.a`
font-weight: 700;
color: #eeeeee;
text-decoration: none;
text-align: center;
`

const LinkWrapper = styled.div`
display: block;
text-align: center; 
@media (min-width:1600px) {
    
  }
`

const CopyRight = styled.span`
display: block;
margin: 30px 16px;
text-align: center;
color: ${Theme.sidePanelNav};
font-size: 12px;
font-weight: 600;
`

const NavigationLink = styled.a`
padding: 14px;
color: ${Theme.sidePanelNav};
  text-rendering: optimizeLegibility;
  text-decoration: none;
  font-size: 15px;
  font-weight: 100;
  transition: 0.2s ease-in-out all;

  &:hover {
    opacity: 0.7;
  }
  display: block;
  @media (min-width:1600px) {
    padding: 14px;
  }
`

const LogoText = styled.span`
    text-align: justify;
    font-size: 24px;
`


export default SidePanel;
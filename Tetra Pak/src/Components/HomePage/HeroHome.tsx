import React from 'react';
import { Theme } from '../../theme';
import styled from "styled-components";
import { HeaderConfig, HeroConfig } from '../../config/HomeConfig';
import { useNavigate } from 'react-router-dom';
import Icon from 'react-icons-kit';
import {chevronRight} from 'react-icons-kit/oct/chevronRight'

const HeroHome: React.FC = () => {
    const navigate = useNavigate();
    return <Wrapper>
        <HeroImageContainer>
            <img src={HeroConfig.background} alt="" />
            <TextWrapper>
                <TextContainer>
                    <p style={{color: "white"}}>SOYA OPPORTUNITIES</p>
                    <Title>{HeroConfig.title}</Title>
                    <SubTitle>{HeroConfig.description}</SubTitle>
                    <Button onClick={() => window.open(HeroConfig.onClickButtonRedirect)}>{HeroConfig.buttonText}
                    <Icon style={{marginLeft: "12px"}} icon={chevronRight}></Icon></Button>
                </TextContainer>
            </TextWrapper>
        </HeroImageContainer>
    </Wrapper>
};



const Wrapper = styled.div`
width: 100%;
margin: 0 auto;
font-family: inherit;
display: flex;
justify-content: center;
background-position: center;
background-color: #F6F6F6;
background-repeat: no-repeat;
background-size: cover;
margin: 112px 0 32px;
`

const HeroImageContainer = styled.div`
    width: 100%;
    position: relative;
    max-width: 1400px;
    
`;

const TextContainer = styled.div`
    margin-left: 64px;
    width: 530px;
`;

const TextWrapper = styled.div`
width: 50%;
background: linear-gradient(90deg,rgba(0,0,0,0.7),rgba(0,0,0,0) 99.61%);
position: absolute;
left: 0;
top: 0;
bottom 0;
right: 0;
display: flex;
justify-content: center;
flex-direction: column;
`


const Title = styled.h1`
font-weight: ${HeroConfig.titleFontWeight};
max-width : ${HeroConfig.titleWidth};
font-size: ${HeroConfig.titleFontSize};
color: white;
@media (max-width: 480px) {
    font-size: ${Number(HeroConfig.titleFontWeight.substring(0, 2)) - 30}px;
}
`


const SubTitle = styled.p`
font-weight: 300;
max-width : ${HeroConfig.subTitleWidth};
font-size: ${HeroConfig.subTitleFontSize};
width : 90%;
color: white;
margin-top: 20px;
@media (max-width: 480px) {
    width: 90%;
}
`

const Button = styled.button`
padding: 2px 24px;
height: 40px;
background-color: ${Theme.button};
border-radius: 8px;
font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 28px;
color: #023f88;
margin-top: 16px;
border: none;
cursor: pointer;
transition: 0.2s ease-in-out;
&:hover {
    background-color: #00bdf2;
    color: #fff;
}

`

export default HeroHome;
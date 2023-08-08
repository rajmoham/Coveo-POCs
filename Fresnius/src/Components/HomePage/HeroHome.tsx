import React from 'react';
import {Theme} from '../../theme';
import styled from "styled-components";
import { HeaderConfig, HeroConfig } from '../../config/HomeConfig';
import { useNavigate } from 'react-router-dom';

const HeroHome: React.FC = ()=>{
    const navigate = useNavigate();
    return <Wrapper>
        <TextWrapper>
        <Title>{HeroConfig.title}</Title>
        <SubTitle>{HeroConfig.description}</SubTitle>
        <Button onClick = {()=> window.open(HeroConfig.onClickButtonRedirect)}>{HeroConfig.buttonText}</Button>
        </TextWrapper>
    </Wrapper>
};

const Title = styled.h1`
width : 95%;
font-weight: ${HeroConfig.titleFontWeight};
max-width : ${HeroConfig.titleWidth};
font-size: ${HeroConfig.titleFontSize};
color: white;
line-height: 40px;
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
margin-bottom: 50px;
@media (max-width: 480px) {
    width: 90%;
}
`

const Button = styled.button`
height: 40px;
background: none;
border-radius: 8px;
font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 24px;
color: #FFFFFF;
margin-top: 10px;
border: none;
cursor: pointer;
transition: 0.2s ease-in-out;
`

const Wrapper = styled.div`
position: relative;
height: ${HeroConfig.height};
width: ${HeroConfig.width};
margin: 0 auto;
font-family: inherit;
display: flex;
flex-direction: column;
justify-content: center;
padding-left: 120px;
background-position: center;
background-color: #333357;
background-repeat: no-repeat;
background-size: cover;
background-image: url(${HeroConfig.background});
@media (max-width: 480px) {
    padding-left: 10px;
   width: 100vw;
   justify-content: flex-start;
   padding-top: 80px;
}
`

const TextWrapper = styled.div`
position: absolute;
background: black;
padding: 32px 40px;
background-color: #103569dd;
&:hover {
    ${Title}, ${SubTitle} {
        text-decoration: underline;
    }

    cursor: pointer;
}
`

export default HeroHome;
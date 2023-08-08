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



const Wrapper = styled.div`
height: ${HeroConfig.height};
width: ${HeroConfig.width};
margin: 100px auto 0;
font-family: inherit;
background-position: center;
background-color: #333357;
background-repeat: no-repeat;
background-size: cover;
background-image: url(${HeroConfig.background});
@media (max-width: 480px) {
    padding-left: 10px;
   width: 100%;
   justify-content: flex-start;
   padding-top: 80px;
}
position: relative;
`

const TextWrapper = styled.div`
background: radial-gradient(circle at 0% 0%, rgb(0, 67, 122) 0%, rgb(0, 30, 80) 100%);
padding: 32px;
border: 2px solid white;
border-radius: 16px;
position: absolute;
top: calc(${HeroConfig.height} / 4);
left: calc(${HeroConfig.width} / 1.75);
@media (max-width: 480px) {
   position: static;
   margin: 16px;
}
`


const Title = styled.h1`
width : 95%;
font-weight: ${HeroConfig.titleFontWeight};
max-width : ${HeroConfig.titleWidth};
font-size: ${HeroConfig.titleFontSize};
color: white;
margin-top: 45px;
@media (max-width: 480px) {
    font-size: ${Number(HeroConfig.titleFontWeight.substring(0, 2)) - 30}px;
}
`


const SubTitle = styled.p`
font-weight: 300;
max-width : ${HeroConfig.subTitleWidth};
font-size: ${HeroConfig.subTitleFontSize};
color: white;
margin-top: 20px;
`

const Button = styled.button`
padding: 16px 32px;
background-color: white;
color: #1E4A79;
border-radius: 8px;
font-family: inherit;
font-style: normal;
font-weight: 800;
font-size: 16px;
margin-top: 40px;
border: none;
cursor: pointer;
transition: 0.2s ease-in-out;
&:hover {
    filter: brightness(0.7);
}

`

export default HeroHome;
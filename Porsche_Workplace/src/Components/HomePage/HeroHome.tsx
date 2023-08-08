import React, { useContext } from "react";
import styled from "styled-components";
import { Theme } from '../../theme';
import { HeroConfig } from '../../config/HomeConfig';
import { MainRecommendationConfig } from '../../config/HomeConfig';
import { useNavigate } from 'react-router-dom';
import { chevronRight } from 'react-icons-kit/fa/chevronRight';
import { Icon } from "react-icons-kit";
import { CustomContextContext } from "../CustomContext/CustomContextContext";
import SidePanelProfile from "../CustomContext/SidePanelProfile";
import ContextDataTable from "../CustomContext/ContextDataTable";
import SidePanel from "../HomePage/SidePanel";
import Jira from '../../assets/jira_logo.png';

const HeroHome: React.FC = () => {
    const navigate = useNavigate();
    const { profileSelected, setProfiledSelected, ContextData, setContextData, handleSave, } = useContext(CustomContextContext);
    const FilteredProfileContext = ContextData.filter((item: any) => item.name === profileSelected)
    const task = FilteredProfileContext[0].name === 'Anonymous' ? '' : FilteredProfileContext[0].tasks;


    let isMorning = HeroConfig.time.getHours() > 5 && HeroConfig.time.getHours() <= 12;
    let isAfternoon = HeroConfig.time.getHours() > 12 && HeroConfig.time.getHours() <= 18;
    let isEvening = HeroConfig.time.getHours() > 18 && HeroConfig.time.getHours() <= 22;
    let isNight = HeroConfig.time.getHours() > 22 || HeroConfig.time.getHours() <= 5;

    const date = new Date();

    return <Wrapper>
        <div style={{ whiteSpace: 'nowrap', width: '100%' }}>
            <DateToday>{date.toUTCString().slice(0, 16)}</DateToday>
            <div style={{ display: "flex", alignItems: "center", margin: "16px 0" }}>
                <Logo src={HeroConfig.background} />
                <Title>
                    {HeroConfig.title}<span>{isMorning ? 'Morning' : isAfternoon ? 'Afternoon' : isEvening ? 'Evening' : 'Night'}</span>&nbsp;
                    {FilteredProfileContext[0].name.split(" ", 2)[0] === 'Anonymous' ? '' : FilteredProfileContext[0].name.split(" ", 2)[0]} !
                </Title>
            </div>
            <SubTitle>{HeroConfig.subtitle}</SubTitle>
            <br />
            {FilteredProfileContext[0].name === 'Anonymous' ? '' :
                (<Card>
                    <div style={{ flexDirection: 'column', marginBottom: '5px' }}>
                        <Button><img src={Jira} style={{ width: '25px', height: '20px' }} /> &nbsp; &nbsp;{task[0]}</Button>
                    </div>
                    <div style={{ flexDirection: 'column', marginBottom: '5px' }}>
                        <Button><img src={Jira} style={{ width: '25px', height: '20px' }} /> &nbsp; &nbsp;{task[1]}</Button>
                    </div>
                </Card>)
            }


        </div>
    </Wrapper>
};



const Wrapper = styled.div`
margin-top: 60px;
height: 150px;
width: 100%;
font-family: inherit;
display: block;
margin-left: 40px;
@media (max-width: 480px) {
   width: 100vw;
   justify-content: flex-start;
}
`

const DateToday = styled.div`
margin-top: 10px;
color: #9C9E9F;
font-size: 16px;
font-family: canada-type-gibson;
`

const Logo = styled.img`
width: 32px;
display: inline-block;
`

const Card = styled.div`
display: block;
`


const TextWrapper = styled.div`
padding: .5rem;
width: 450px;
margin-left: 15px;
@media (min-width: 1550px) {
    font-size: 40px;
    margin-left: 280px;
}
`


const Title = styled.h1`
font-weight: 800;
display: inline-block;
font-family: canada-type-gibson;
font-size: 36px;
margin-left: 10px;
color: ${Theme.primaryText};
@media (max-width: 480px) {
    font-size: 40px;
}
`

const Sub = styled.p`
font-weight: 300;
font-size: 14px;
line-height: 18px;
margin-top: 2px;
color:  white;
@media (max-width: 480px) {
    width: 80%;
}
&:hover {
    color: #023f88;
}
`

const SubTitle = styled.p`
font-weight: 300;
font-size: 18px;
line-height: 18px;
margin-left: 10px;
color:  ${Theme.primaryText};
margin-top: 20px;
@media (max-width: 480px) {
    width: 80%;
}
`

const Button = styled.button`
display: flex;
padding: 4px 20px;
height: 28px;
background-color: #191F22;
border-radius: 8px;
font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 13px;
align-items: center;
font-size: 14px;
color: #EEEEEE;
border: none;
cursor: pointer;
transition: 0.2s ease-in-out;
&:hover {
    background-color: #777777;
}

`

export default HeroHome;
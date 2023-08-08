import react, { useState } from 'react';

import HomeResultsSearchBox from './HomePage/HomeResultsSearchBox';
import SidePanel from './HomePage/SidePanel';
import Header from './HomePage/Header';

import styled from 'styled-components';
import { keyframes } from 'styled-components';
import {Document, Page, pdfjs} from 'react-pdf';
import { Box, CircularProgress } from '@mui/material';

import pdfPlan from "../assets/Porsche/Posche_Zuffenhausen_Factory_Plan.pdf"

const openSearchBox = () => {
    //nothing
}

const FactoryPlan = () => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
    return (
        <>
            <SidePanel />
            <Header />
            <Wrapper>
                <h1 style={{ fontSize: "36px" }}>Factory Plan</h1>
                <div style={{ marginTop: "48px", display: "flex", width: "100%", position: "relative" }}>
                    <Document file={pdfPlan} loading={<Loading />}>
                        <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} height={775} width={1102} />
                    </Document>



                    {/*                     <MapPoint top={650} left={400} description='Neuwagenauslieferung + Werkswagenverkauf' section={"#"} number={1} color='red'/>
                    <MapPoint top={96.3} left={34.8} description='Porsche Accessoires und Zubehör' section={"#"} number={2} color='red'/>
                    <MapPoint top={65} left={34.2} description='Porsche Museum' section={"#"} number={3} color='red'/>
                    <MapPoint top={93} left={32.4} description='Betriebliches Mobilitätsmanagement' section={"#"} number={4} color='red'/>
                    <MapPoint top={97} left={33} description='Fuhrparkservice' section={"#"} number={5} color='red'/>

                    <MapPoint top={71} left={11} description='Lackierereri' section={"#"} color='#3ef05c'/>
                    <MapPoint top={71} left={11} description='E-Motoren' section={"#"} color='#3ef05c'/>
                    <MapPoint top={63} left={27} description='Karosserie' section={"#"} color='#3ef05c'/>
                    <MapPoint top={37} left={38} description='Montage' section={"#"} color='#3ef05c'/> */}
                </div>
                {/*                 <div>
                    <section style={{ marginBottom: "200px" }} id='paintshop'>Paint Shop</section>
                    <section style={{ marginBottom: "200px" }} id='carbodyshop'>Car Body Shop</section>
                    <section style={{ marginBottom: "200px" }} id='assembly'>Assembly</section>
                    <section style={{ marginBottom: "200px" }} id='emotor'>E-Motor</section>
                </div> */}
            </Wrapper>
        </>
    )
}

const Loading = () => {
    return (
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "50vw",
          height: "50vh",
        }}
      >
        <CircularProgress />
        <span style={{fontSize: "20px", marginTop: "16px"}}>Loading Plan</span>
      </Box>
    )
}

interface MapPointProps {
    top: number,
    left: number,
    description: string
    section?: string
    color: string;
    number?: number
}

const MapPoint = (props: MapPointProps) => {
    const { top, left, description, section, number, color } = props;
    return (
        <>
            <a href={section ? section : "#"}>
                <MapPointShape style={{ top: `${top}PX`, left: `${left}PX`, backgroundColor: color }}>
                    {number && number}
                    <PointInfo style={{ top: "25px", left: "-40px" }} /* style={{ top: `calc(${top}% + 25px)`, left: `calc(${left}% - 40px)` }} */>
                        {description}
                    </PointInfo>
                </MapPointShape>
            </a>
        </>
    )
}

const slideIn = keyframes`
0% {
  transform: translateX(200px);
}
100% {
  transform: translateX(0);
}
`

const Wrapper = styled.div`
    position: relative;
    top: 100px;
    left: 280px;
    right: 0;
    width: calc(100vw - 280px);
    padding: 32px 64px;
    -webkit-animation: ${slideIn} 0.6s forwards;
    box-sizing: border-box;
-webkit-animation-delay: 2s;
animation: ${slideIn} 0.6s forwards;
`;

const PointInfo = styled.div`
    opacity: 0;
    pointer-events: none;
    background-color: #555555;
    border: 2px solid black;
    position: absolute;
    min-width: 100px;
    padding: 0 4px;
    color: white;
    text-align: center;
    font-size: 14px;
    z-index: 5;
    font-weight: 500;
`;

const MapPointShape = styled.div`
    width: 17px;
    height: 17px;
    border-radius: 50%;
    border: 2px solid black;
    color: white;
    display: flex;
    justify-content: center;
    font-size: 10px;
    position: absolute;
    cursor: pointer;
    &:hover ${PointInfo} {
        opacity: 1;
    }
`;

export default FactoryPlan;
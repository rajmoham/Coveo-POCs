import React from "react";
import HeroHome from "./HeroHome";
import styled from "styled-components";
import MainRecommendations from "../Recommendations/MainRecommendations";
import VideoRecommendations from "../Recommendations/VideoRecommendations";
import { MainRecommendationConfig, VideoRecommendationConfig } from "../../config/HomeConfig";

const HomePage: React.FC = () => {

  return (
    <Wrapper>
      <HeroHome />
      <MainWrapper>
        {Object.keys(MainRecommendationConfig).length !== 0 && MainRecommendationConfig.active &&  <MainRecommendations />}
        {Object.keys(VideoRecommendationConfig).length !== 0 && VideoRecommendationConfig.active && <VideoRecommendations />}
      </MainWrapper>
    </Wrapper>
  );
};

const MainWrapper = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f6f6f6;
  padding: 0 16px;
`;



export default HomePage;

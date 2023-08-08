import React from "react";
import HeroHome from "./HeroHome";
import { Theme } from "../../theme";
import styled from "styled-components";
import MainRecommendations from "../Recommendations/MainRecommendations";
import VideoRecommendations from "../Recommendations/VideoRecommendations";
import SlackRecommendations from '../Recommendations/SlackRecommendations';
import { MainRecommendationConfig, VideoRecommendationConfig, slackConfig } from "../../config/HomeConfig";

const HomePage: React.FC = () => {

  return (
    <>
      <MainWrapper>
        <HeroHome />
        {Object.keys(MainRecommendationConfig).length !== 0 &&  <MainRecommendations />}
        {Object.keys(slackConfig).length !== 0 &&  <SlackRecommendations />}
        {Object.keys(VideoRecommendationConfig).length !== 0 && <VideoRecommendations />}
      </MainWrapper>
    </>
  );
};

const MainWrapper = styled.div`
  width: 100%;
  background-color: ${Theme.navbar};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 20px;
`;



export default HomePage;
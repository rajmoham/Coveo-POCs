import React from "react";
import { Theme } from "../../theme";
import styled from "styled-components";
import { chevronRight } from "react-icons-kit/feather/chevronRight";
import { Icon } from "react-icons-kit";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface RecommendationCardType {
  title: string;
  description: string;
  date: number;
  image: string;
  video?: boolean;
  clickUri: string;
  onClick: () => void;
  onContextMenu: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  source?: string;
}

const RecommendtionCard: React.FC<RecommendationCardType> = ({
  title,
  description,
  date,
  image,
  video = true,
  clickUri,
  onClick,
  onContextMenu,
  onMouseDown,
  onMouseUp,
  source = "",
}) => {
  
  const newdate = new Date(Number(date));

  return (
    <MainWrapper
      key={title}
      onClick={() => {
        onClick();
        window.open(clickUri, "_blank", "noopener,noreferrer");
      }}
      onContextMenu={onContextMenu}
      /* onMouseDown = {onMouseDown}
        onMouseUp = {onMouseUp} */
    >
      <ImageContainer>
        <Image src={image} />
      </ImageContainer>
      <TextWrapper>
        <ReferralLink>
        {newdate.getDate() +
                      "/" +
                      (newdate.getMonth() + 1) +
                      "/" +
                      newdate.getFullYear()}
        </ReferralLink>
        <Title>{title.toLocaleUpperCase()}</Title>
        <SubTitle>{description}</SubTitle>
      </TextWrapper>
    </MainWrapper>
  );
};

export const SkeletonRecommendtionCard: React.FC = () => {
  return (
    <MainWrapper>
      <Skeleton
        style={{ height: "250px", position: "relative", top: "-5px" }}
      />
      <div style={{ padding: "30px 20px" }}>
        <Skeleton count={1} style={{ marginBottom: "20px", height: "50px" }} />
        <Skeleton count={2} style={{ margin: "10px 0px" }} />
      </div>
    </MainWrapper>
  );
};

const ImageContainer = styled.div`
  overflow: hidden;
  display: flex;
`;

const Image = styled.img`
height: 50px;
margin: 0 auto;
transition: 0.2s ease-in-out all;
`;
const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 180px;
  align-items: center;
  justify-content: space-around;
  padding: 10px 20px;
  flex-direction: column;
  margin-bottom: 16px;
`;



const Title = styled.a`
  color: ${Theme.primaryText};
  font-family: canada-type-gibson;
  text-rendering: optimizeLegibility;
  font-style: normal;
  align-self: flex-start;
  font-weight: 600;
  font-size: 18px;
  line-height: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SubTitle = styled.span`
font-family: canada-type-gibson;
text-rendering: optimizeLegibility;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  color: ${Theme.primaryText};
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReferralLink = styled.a`
  font-family: inherit;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  margin-top: 10px;
  color: ${Theme.primaryText};
  text-decoration: none;
  display: flex;
  align-self: flex-start;
  opacity: 0.8;
  cursor: pointer;
`;

const MainWrapper = styled.div`
width: 350px;
margin-right: 28px;
margin-bottom: 20px;
max-width: 37.5em;
min-width: 17.5em;
box-sizing: border-box;
padding: 2px;
overflow: hidden;
cursor: pointer;
border: 1px solid #e5e8e8;
transition: all 300ms ease;
padding: 16px 8px;

&:hover {
    border: 1px solid #ae0000;
}

  &:hover ${ReferralLink} {
    opacity: 1;
}

&:hover ${Title} {
  color: #ae0000;
}

  }
  @media (max-width: 480px) {
    width: 90vw;
  }
`;

export default RecommendtionCard;

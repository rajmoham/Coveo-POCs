import React from "react";
import { Theme } from "../../theme";
import styled from "styled-components";
import { chevronRight } from "react-icons-kit/feather/chevronRight";
import { Icon } from "react-icons-kit";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface RecommendationCardType {
  title: string;
  date?: string;
  description: string;
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
  date,
  description,
  image,
  video = true,
  clickUri,
  onClick,
  onContextMenu,
  onMouseDown,
  onMouseUp,
  source = "",
}) => {



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
      {video &&
        <ImageContainer>
          <Image src={image} />
        </ImageContainer>
      }
      <TextWrapper>
        <Title>{title}</Title>
        {date && <DateText>{date}</DateText> }
        <SubTitle>{description}</SubTitle>
        <ReferralLink>
          {!video ? "Learn more" : "Watch now"}{" "}
          <div style={{ marginLeft: "5px" }}>
            <Icon icon={chevronRight} />
          </div>
        </ReferralLink>
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
`;

const Image = styled.img`
  height: 250px;
  width: 100%;
  object-fit: cover;
  transition: 0.2s ease-in-out all;
`;
const TextWrapper = styled.div`
  display: flex;
  width: fit-content;
  height: 250px;
  justify-content: space-around;
  padding: 16px 24px;
  flex-direction: column;
  text-overflow: ellipsis;
`;

const Title = styled.a`
  font-family: inherit;
  text-decoration: none;
  font-style: normal;
  align-self: flex-start;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: #002967;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  line-clamp: 3; 
  -webkit-box-orient: vertical;
  overflow-wrap: break-all;
  text-align: start;
  text-justify: inter-word;
`;

const DateText = styled.p`
  color: #343434;
  text-align: start;
  margin-left: 2px;
  font-size: 12px;
`;

const SubTitle = styled.span`
  font-family: inherit;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
  color: ${Theme.primaryText};
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  line-clamp: 3; 
  -webkit-box-orient: vertical;
  width: 280px;
  text-align:start;
`;

const ReferralLink = styled.a`
  font-family: inherit;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #888888;
  text-decoration: none;
  display: flex;
  align-self: flex-start;
  opacity: 1;
  cursor: pointer;
  transition: all ease .2s;
`;

const MainWrapper = styled.div`
  width: 350px;
  margin: 20px;
  background: white;
  cursor: pointer;
  box-shadow: 3px 3px 6px #a5a5a5;

  &:hover { 
    ${Image} {
      transform: scale(1.03);
    }

    ${ReferralLink} {
      color: #002967;
    }

    ${Title} {
      text-decoration: underline;
    }
  }

  @media (max-width: 480px) {
    width: 90vw;
  }
`;

export default RecommendtionCard;

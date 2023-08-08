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
      <ImageContainer>
        <Image src={image} />
      </ImageContainer>
      <TextWrapper>
        <Title>{title}</Title>
        <SubTitle>{description}</SubTitle>
        <ReferralLink>
          {!video ? "Learn more" : "Watch now"}{" "}
          <div style={{ marginLeft: "5px", color: Theme.primary}}>
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
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  text-overflow: ellipsis;
  margin-top: 22px;
`;

const Title = styled.a`
  font-family: inherit;
  text-decoration: none;
  font-style: normal;
  align-self: flex-start;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: ${Theme.primaryText};
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  line-clamp: 2; 
  -webkit-box-orient: vertical;
  overflow-wrap: break-all;
  height: 44px;
`;

const SubTitle = styled.span`
  margin: 22px 0;
  font-family: inherit;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 22px;
  color: ${Theme.primaryText};
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  line-clamp: 3; 
  -webkit-box-orient: vertical;
`;

const ReferralLink = styled.a`
  font-family: inherit;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: ${Theme.primary};
  text-decoration: none;
  display: flex;
  align-self: flex-start;
  opacity: 0.8;
  cursor: pointer;
`;

const MainWrapper = styled.div`
  width: 100%;
  cursor: pointer;
  &:hover ${Title} {
    color: ${Theme.primary};
  }
  &:hover ${Image} {
    transform: scale(1.03);
  }
`;

export default RecommendtionCard;

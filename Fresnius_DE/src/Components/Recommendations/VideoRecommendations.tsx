import { useEffect, useState, FunctionComponent, useContext } from "react";
import {
  RecommendationList as HeadlessRecommendationList,
  loadClickAnalyticsActions,
  Result,
  buildRecommendationEngine,
  buildRecommendationList,
  getOrganizationEndpoints,
} from "@coveo/headless/recommendation";
import { Theme } from "../../theme";
import styled from "styled-components";
import RecommendtionCard, {
  SkeletonRecommendtionCard,
} from "./RecommendationCard";
import { CustomContextContext } from "../CustomContext/CustomContextContext";
import { DefaultRecommendationImage, VideoRecommendationConfig } from "../../config/HomeConfig";
import EngineContext from "../../common/engineContext";
import { getSearchToken } from "../../common/Engine";

interface RecommendationListProps {
  controller: HeadlessRecommendationList;
  engine: any;
}

export const RecommendationListRenderer: FunctionComponent<
  RecommendationListProps
> = (props) => {
  const engine = props.engine;
  const { controller } = props;
  const [state, setState] = useState(controller.state);

  useEffect(() => {
    controller.refresh();
    controller.subscribe(() => setState(controller.state));
  }, []);

  if (state.error) {
    return (
      <div>
        <div>Oops {state.error.message}</div>
        <code>{JSON.stringify(state.error)}</code>
        <button onClick={() => controller.refresh()}>Try again</button>
      </div>
    );
  }

  const logClick = (recommendation: Result) => {
    if (!engine) {
      return;
    }
    const { logRecommendationOpen } = loadClickAnalyticsActions(engine);
    engine.dispatch(logRecommendationOpen(recommendation));
  };

  const skeletonArray = [1, 2, 3];
  const NumberOfResult = VideoRecommendationConfig.numberOfResults;
  return (
    <MainWrapper>
      <Title>{VideoRecommendationConfig.title}</Title>
      <SubTitle>{VideoRecommendationConfig.description}</SubTitle>
      {state.recommendations.length > 0 ? (
        <CardWrapper>
          {state?.recommendations
            ?.slice(0, NumberOfResult)
            .map((recommendation, index) => {
              const temp: unknown =
                recommendation.raw[`${VideoRecommendationConfig.imageField}`];
              const imgeURL: string = temp as string;

              return (
                <div key={recommendation.title + recommendation.uniqueId}>
                  <RecommendtionCard
                    video={true}
                    title={recommendation.title}
                    description={recommendation.excerpt}
                    image={imgeURL ? imgeURL : DefaultRecommendationImage}
                    clickUri={recommendation.clickUri}
                    onClick={() => logClick(recommendation)}
                    onContextMenu={() => logClick(recommendation)}
                    onMouseDown={() => logClick(recommendation)}
                    onMouseUp={() => logClick(recommendation)}
                  />
                </div>
              );
            })}
        </CardWrapper>
      ) : (
        <CardWrapper>
          {skeletonArray.map((item, index) => {
            return (
              <div key={item}>
                <SkeletonRecommendtionCard />
              </div>
            );
          })}
        </CardWrapper>
      )}
    </MainWrapper>
  );
};

const VideoRecommendation = () => {

  const Engine = useContext(EngineContext)!;

  const [token, setToken] = useState('');
  const { settingContextFromEngine } = useContext(CustomContextContext);
  useEffect(()=>{
    (async ()=>{
      setToken(await getSearchToken())
    })()
  },[])



  if(!token) return null;


  const recommendationEngine = buildRecommendationEngine({
    configuration: {
      organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
      accessToken: token,
      searchHub: VideoRecommendationConfig.searchHub,
      pipeline: VideoRecommendationConfig.pipeline,
      organizationEndpoints : getOrganizationEndpoints(process.env.REACT_APP_ORGANIZATION_ID!),
    },
  });

  settingContextFromEngine(recommendationEngine);

  const recController = buildRecommendationList(recommendationEngine, {
    options: { id: VideoRecommendationConfig.id },
  });

  return (
    <RecommendationListRenderer
      controller={recController}
      engine={recommendationEngine}
    />
  );
};

export default VideoRecommendation;

const MainWrapper = styled.div`
  width: 95%;
  border-radius: 24px;
  position: relative;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  text-align : center;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 600;
  font-family: inherit;
  color: ${Theme.primaryText};
  margin-top: 30px;
  margin-bottom: 10px;
`;

const SubTitle = styled.p`
  font-weight: 300;
  font-size: 18px;
  line-height: 28px;
  color: ${Theme.primaryText};
  margin-bottom: 20px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 1500px;
  margin-top: 20px;
`;

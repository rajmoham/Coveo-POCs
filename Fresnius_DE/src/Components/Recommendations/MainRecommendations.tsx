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
import { DefaultRecommendationImage, MainRecommendationConfig } from "../../config/HomeConfig";
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
  const NumberOfResult = MainRecommendationConfig.numberOfResults;
  return (
    <MainWrapper>
      <Title>{MainRecommendationConfig.title}</Title>
      <SubTitle>{MainRecommendationConfig.description}</SubTitle>
      {state.recommendations.length > 0 ? (
        <CardWrapper>
          {state?.recommendations
            ?.slice(0, NumberOfResult)
            .map((recommendation, index) => {
              const temp: unknown =
                recommendation.raw[`${MainRecommendationConfig.imageField}`];
              const imageURL: string = temp as string;
              const date = recommendation.raw["date"] as number;
              const date_str = new Date(date).toISOString().substring(0, 10);

              return (
                <div key={recommendation.title + recommendation.uniqueId}>
                  <RecommendtionCard
                    video={false}
                    title={recommendation.title}
                    date={date_str}
                    description={recommendation.excerpt}
                    image={imageURL ? imageURL : DefaultRecommendationImage}
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

const MainRecommendationList = () => {



  const Engine = useContext(EngineContext)!;

  const [token, setToken] = useState('');
  const { settingContextFromEngine } = useContext(CustomContextContext);
  useEffect(() => {
    (async () => {
      setToken(await getSearchToken())
    })()
  }, [])



  if (!token) return null;


  const recommendationEngine = buildRecommendationEngine({
    configuration: {
      organizationId: process.env.REACT_APP_ORGANIZATION_ID!,
      accessToken: token,
      searchHub: MainRecommendationConfig.searchHub,
      pipeline: MainRecommendationConfig.pipeline,
      organizationEndpoints: getOrganizationEndpoints(process.env.REACT_APP_ORGANIZATION_ID!),
    },
  });



  settingContextFromEngine(recommendationEngine);

  const recController = buildRecommendationList(recommendationEngine, {
    options: { id: MainRecommendationConfig.id },
  });

  return (
    <RecommendationListRenderer
      controller={recController}
      engine={recommendationEngine}
    />
  );
};

export default MainRecommendationList;

const MainWrapper = styled.div`
width: 100%;
  background-color: white;
  text-align : center;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  background: linear-gradient(208deg, rgba(107,131,167,1) 11%, rgba(194,203,219,1) 88%);
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 600;
  font-family: inherit;
  color: white;
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
  max-width: 1200px;
  margin-top: 20px;
`;

import React, { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import SearchSideBarRecommendationList from "./SearchSideBarRecommendationList";
import { useParams } from "react-router-dom";
import SearchTabs from "./SearchTabs";
import MyResultTemplateFunction from "./SearchResultTemplates";
import { Theme } from "../../theme";
import {
  DefaultSideBarRecommendationConfig,
  SearchPageTabConfig,
} from "../../config/SearchConfig";
import styled from 'styled-components'
import NotifyTrigger from "./NotifyTrigger";
import RedirectionTrigger from "./RedirectionTrigger";
import { keyframes } from 'styled-components';
import { AtomicResultList } from "@coveo/atomic-react";
import { QuickViewModalContext } from "./QuickViewModalContext";
import SidePanel from "../HomePage/SidePanel";
import SearchBox from "./SearchBox";
import EngineContext from "../../common/engineContext";

const SearchPage = (props) => {
  const { filter } = useParams();
  const Engine = useContext(EngineContext);
  const QuickViewObj = useContext(QuickViewModalContext);

  return (
    <>
      <SidePanel />
      <Content>
        <Grid
          container
          justifyContent="center"
          style={{
            background: "#EFF0F1",
            height: "100px",
            alignItems: "center",
          }}
        >
          <SearchBoxContainer>
            <SearchBox />
          </SearchBoxContainer>
        </Grid>
        <SearchTabs filterSelected={filter ? filter : "All"} />
        <SearchInterfaceContainer>
          <RedirectionTrigger />
          <NotifyTrigger />
          <atomic-search-layout>
            <style>{AtomicTheme}</style>
            <atomic-layout-section section="facets" max-width="250px">
              {/* <atomic-category-facet
                field="custurlnav"
                label="Category"
                field-id="CategoryFacet"
                heading-level="3"
                sort-criteria="occurrences"
                delimiting-character="|"
                with-search={true}
                facet-id={"custurlnav"}
              ></atomic-category-facet> */}
              <atomic-facet-manager>
                <atomic-facet
                  field="author"
                  label="Authors"
                  facet-id={"author"}
                ></atomic-facet>
                <atomic-facet
                  field="source"
                  label="Source"
                  facet-id={"source"}
                ></atomic-facet>
                <atomic-facet
                  field="category"
                  label="Platform Solutions"
                  facet-id={"category"}
                ></atomic-facet>
                <atomic-facet
                  field="concepts"
                  label="Concepts"
                  facet-id={"concepts"}
                ></atomic-facet>
              </atomic-facet-manager>
            </atomic-layout-section>

            <atomic-layout-section section="main">
              <atomic-layout-section section="status">
                <atomic-breadbox></atomic-breadbox>
                <atomic-query-summary></atomic-query-summary>
                <atomic-refine-toggle></atomic-refine-toggle>

                <atomic-sort-dropdown>
                  <atomic-sort-expression
                    label="relevance"
                    expression="relevancy"
                  ></atomic-sort-expression>
                  <atomic-sort-expression
                    label="most-recent"
                    expression="date descending"
                  ></atomic-sort-expression>
                </atomic-sort-dropdown>

                <atomic-did-you-mean></atomic-did-you-mean>
              </atomic-layout-section>

              <atomic-layout-section section="results">
                <atomic-smart-snippet></atomic-smart-snippet>
                <atomic-smart-snippet-suggestions></atomic-smart-snippet-suggestions>
                <AtomicResultList template={(result) => MyResultTemplateFunction(result, QuickViewObj)}></AtomicResultList>
                <atomic-query-error></atomic-query-error>
                <atomic-no-results></atomic-no-results>
              </atomic-layout-section>
              <atomic-layout-section section="pagination">
                <atomic-load-more-results></atomic-load-more-results>
              </atomic-layout-section>
              <atomic-layout-section section="pagination">
                <atomic-pager></atomic-pager>
                <atomic-results-per-page></atomic-results-per-page>
              </atomic-layout-section>
            </atomic-layout-section>
          </atomic-search-layout>
        </SearchInterfaceContainer>
      </Content>
    </>
  );
};

export default SearchPage;



export const SideBarRecommendation = ({ filter }) => {

  return <>
    {DefaultSideBarRecommendationConfig.length > 0 ? (
      <>
        {DefaultSideBarRecommendationConfig.map((item) => {
          return (
            <React.Fragment key={item.title}>
              <SearchSideBarRecommendationList
                pipeline={item?.pipeline}
                NumberofResults={item?.NumberofResults}
                title={item?.title}
                videoRecommendation={item?.videoRecommendation}
                imageField={item.imageField}
                searchHub={item.searchHub}
              />
            </React.Fragment>
          );
        })}
      </>
    ) : (
      <>
        {SearchPageTabConfig.map((tab, index) => {
          if (
            (filter?.toLowerCase() ===
              tab.caption.replace(/\s/g, "").toLowerCase() ||
              (index === 0 && filter === undefined)) &&
            tab.sideBarRecommendationConfig
          ) {
            return (
              <React.Fragment key={tab.caption}>
                <>
                  {tab.sideBarRecommendationConfig.map((item) => {
                    return (
                      <React.Fragment key={item.title}>
                        <SearchSideBarRecommendationList
                          pipeline={item.pipeline}
                          NumberofResults={item.NumberofResults}
                          title={item.title}
                          videoRecommendation={item.videoRecommendation}
                          imageField={item.imageField}
                          searchHub={item.searchHub}
                        />
                      </React.Fragment>
                    );
                  })}
                </>
              </React.Fragment>
            );
          }
        })}
      </>
    )}
  </>
}

const slideIn = keyframes`
0% {
  transform: translateX(200px);
}
100% {
  transform: translateX(0);
}
`

const SearchInterfaceContainer = styled.div`
  margin-top: 50px;
  display: flex
  justify-content: center;
`;

const SearchBoxContainer = styled.div`
  width: 80%;
`

const Content = styled.div`
position: relative; 
/* -webkit-animation: ${slideIn} 0.6s forwards;
-webkit-animation-delay: 2s;
animation: ${slideIn} 0.6s forwards; */
width: calc(100vw - 280px);
left: 280px;
`

const AtomicTheme = `
:root {
  --atomic-font-family: inherit;
  --atomic-primary : ${Theme.primary};
  --atomic-on-background : ${Theme.primaryText};
  --atomic-primary-light : ${Theme.primary}80;
  --atomic-primary-dark : ${Theme.primary};
}
`
/* const SearchLayout = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-areas:
    '. . atomic-section-search .'
    '. atomic-section-main atomic-section-facets .'
    '. . atomic-section-facets .';
  grid-template-columns: 1fr minmax(50%, 70rem) minmax(17rem, 22rem) 1fr;
  column-gap: 1.5rem;
`; */
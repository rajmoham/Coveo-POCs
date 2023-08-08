import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import SearchBox from "./SearchBox";
import { Theme } from "../../theme";
import SearchSideBarRecommendationList from "./SearchSideBarRecommendationList";
import { useParams } from "react-router-dom";
import SearchTabs from "./SearchTabs";
import {
  DefaultSideBarRecommendationConfig,
  EnableRecentQueries,
  EnableRecentResultList,
  SearchPageTabConfig,
} from "../../config/SearchConfig";
import styled from "styled-components";
import PoweredBy from "./PoweredBy";
import MyResultTemplateFunction from "../../config/ResultTemplate";
import { AtomicResultList } from "@coveo/atomic-react";
import RedirectionTrigger from "./RedirectionTrigger";
import NotifyTrigger from "./NotifyTrigger";
import EngineContext from "../../common/engineContext";
import { QuickViewModalContext } from "./QuickViewModalContext";
import { RecentQueriesList } from "./RecentQueriesList";
import { RecentResultsList } from "./RecentResultsList";

const SearchPage = (props) => {
  const { filter } = useParams();
  const Engine = useContext(EngineContext);
  const QuickViewObj = useContext(QuickViewModalContext);
  return (
    <>
      <Grid
        container
        justifyContent="center"
        style={{
          background: Theme.searchBarBackground,
          marginTop: "48px"
        }}
      >
        <SearchBoxContainer>
          <SearchBoxTitle>What can we help you find?</SearchBoxTitle>
          <SearchBox />
          <PoweredBy />
        </SearchBoxContainer>
      </Grid>
      <SearchTabs filterSelected={filter ? filter : ""} />
      <SearchInterfaceContainer>
        <AtomicSearchWrapper>
          <RedirectionTrigger />
          <NotifyTrigger />
          <atomic-search-layout>
            <style>{AtomicTheme}</style>
            <atomic-layout-section section="facets">
              <atomic-category-facet
                field="custurlnav"
                label="Category"
                field-id="CategoryFacet"
                heading-level="3"
                sort-criteria="occurrences"
                delimiting-character="|"
                with-search={true}
                facet-id={"custurlnav"}
              ></atomic-category-facet>
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
                <AtomicResultList
                  template={(result) =>
                    MyResultTemplateFunction(result, QuickViewObj)
                  }
                ></AtomicResultList>
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
        </AtomicSearchWrapper>
        <RecentsBoxContainer>
          <SideBarRecommendation filter={filter} engine={Engine}>
          {EnableRecentQueries && <RecentQueriesList />}
          {EnableRecentResultList &&  <RecentResultsList />}
          </SideBarRecommendation>
        </RecentsBoxContainer>
      </SearchInterfaceContainer>
    </>
  );
};

export default SearchPage;

export const SideBarRecommendation = ({ filter, engine, children }) => {
  return (
    <>
      {DefaultSideBarRecommendationConfig.length > 0 ? (
        <SideBarRecommendationContainer>
          {children}
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
        </SideBarRecommendationContainer>
      ) : (
        <>
          {SearchPageTabConfig.map((tab, index) => {
            const tabHasRecommendation =
              (filter?.toLowerCase() ===
                tab.caption.replace(/\s/g, "").toLowerCase() ||
                (index === 0 && filter === undefined)) &&
              tab.sideBarRecommendationConfig;

            if (tabHasRecommendation) {
              return (
                <React.Fragment key={tab.caption}>
                  <SideBarRecommendationContainer
                    tabHasRecommendation={tabHasRecommendation}
                  >
                    {children}
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
                  </SideBarRecommendationContainer>
                </React.Fragment>
              );
            }
          })}
        </>
      )}
    </>
  );
};

const SearchBoxContainer = styled.div`
  width: 50%;
  height: 300px;
  max-width: 800px;
  min-width: 500px;
  padding: 130px 0px;
  @media (max-width: 480px) {
    min-width: 80vw;
  }
`;

const SearchInterfaceContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const AtomicSearchWrapper = styled.div`
  flex: 3;
  max-width: 1400px;
`;

const SideBarRecommendationContainer = styled.div`
  flex: 1;
  max-width: 400px;
  display: ${(props) => (props.tabHasRecommendation ? "block" : "none")};
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchBoxTitle = styled.h6`
  text-align: center;
  color: white;
  font-size: 32px;
  font-weight: 500;
  padding-bottom: 5px;
  @media (max-width: 480px) {
    font-size: 25px;
  }
`;

const RecentsBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1.5rem;
`;

const AtomicTheme = `
:root {
  --atomic-font-family: inherit;
  --atomic-primary : ${Theme.primary};
  --atomic-on-background : ${Theme.primaryText};
  --atomic-primary-light : ${Theme.primary}80;
  --atomic-primary-dark : ${Theme.primary};
  
 }
`;

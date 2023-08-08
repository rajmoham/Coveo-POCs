import pdfIcon from "../assets/FileTypeIcons/pdf.svg";
import htmlIcon from "../assets/FileTypeIcons/html.svg";
import docIcon from "../assets/FileTypeIcons/doc.svg";
import pptIcon from "../assets/FileTypeIcons/ppt.svg";
import pubIcon from "../assets/FileTypeIcons/pub.svg";
import sfIcon from "../assets/FileTypeIcons/sf.svg";
import { ResultTemplatesHelpers } from "@coveo/headless";
import { Result } from "@coveo/headless";
import {
  DefaultSideBarRecommendationConfigType,
  SearchPageTabConfigType,
} from "./Types/ConfigTypes";


/* 
FieldToIncludesInSearchResults helps you add more fields to the result templates. 
When setting imageField in this file, make sure the field is included in the FieldToIncludesInSearchResults array. 

The fields 'date', 'ytthumbnailurl', 'sysfiletype' should NOT be removed. 
*/

export const FieldToIncludesInSearchResults: string[] = [
  "sfanswer__c",
  "sfid",
  "sysfiletype",
  "date",
  "adimage",
  "ytthumbnailurl",
  "sfimage__c",
  "sfimage_url__c",
  "adspecial",
  "ytthumbnailurl",
  "ytvideoduration"
];

/* 
SearchPageTabConfig helps you configure the Tabs. Each object represent a new Tab.

 - caption -> Name of the Tab
 - expression -> query expression to show in the Tab
 - isActive -> To be active initially when search page loads up
 - sideBarRecommendationConfig -> Can add multiple recommendation in the side bar


You can leave the Array empty if you don't want any tabs

*/

const sideBarPipeline = 'video_rec';

export const SearchPageTabConfig: SearchPageTabConfigType[] = [
  {
    caption: "All",
    expression: "",
    isActive: true,
    sideBarRecommendationConfig: [
      {
        pipeline: sideBarPipeline,
        searchHub: "default",
        NumberofResults: 3,
        title: "Related Videos",
        videoRecommendation: true,
        imageField: "ytthumbnailurl",
      },
    ],  
  },
  {
    caption: "Manufacturing",
    expression: `@title='manufacturing'`,
    isActive: false,
  },
  {
    caption: "Sustainability",
    expression: `@title='sustainability'`,
    isActive: false,
  },
  {
    caption: "Management",
    expression: `@title='management'`,
    isActive: false,
  },
  {
    caption: "Technology",
    expression: `@title='technology'`,
    isActive: false,
  },
  {
    caption: "Carbon",
    expression: `@title='carbon'`,
    isActive: false,
  },
  {
    caption: "Youtube",
    expression: `@filetype=="youtubevideo"`,
    isActive: false,
  },
];

/* 
DefaultSideBarRecommendationConfig is used if you want to show same sideBar recommendation on each tab.
*/

export const DefaultSideBarRecommendationConfig: DefaultSideBarRecommendationConfigType[] =
  []; /* [{
  pipeline: "IRS test",
  NumberofResults: 5,
  title: "Related for Investing",
  videoRecommendation: true,
  imageField: 'ytthumbnailurl'
}] */




export const EnableRecentQueries = true;

export const EnableRecentResultList = true;

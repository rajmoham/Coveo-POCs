import HeroImage from "../assets/Hero.png";
import CoveoLogo from "../assets/CoveoLogo.svg";
import Logo from '../assets/Logo.svg'
import RecommendationDefault from "../assets/Recommendation.jpg";
import { RecommendationType } from "./Types/ConfigTypes";



/* To import your Demo Logo
1. Place the logo in the assets Folder
2. import the logo into this file using the following statement

    import DemoLogo from "../assests/<Logo-Image-filename>"  

    * it is important to add the coorect image extension type in the end of the filename e.g. DemoImage.png, DemoImage.svg or DemoImage.jpg

3. Replace the CoveoLogo with DemoLogo below.
*/

export const HeaderLogo = Logo;

export const FooterLogo = Logo;

export const DefaultRecommendationImage = RecommendationDefault;



export const HeaderConfig = [
  {
    title: "Explore our models",
    redirectTo: "/home",
  },
  {
    title: "Compare our cars",
    redirectTo: "/",
  },
  {
    title: "Electric & Hybrid",
    redirectTo: "/",
  },
  {
    title: "Build your Volkswagen",
    redirectTo: "/",
  },
  {
    title: "Used cars",
    redirectTo: "/",
  },
  {
    title: "Owners & services",
    redirectTo: "/",
  },
  {
    title: "Offers",
    redirectTo: "/",
  }
];

export const HeroConfig = {
  title: "Welcome to Volkswagen",
  description:
    "Advanced search. Relevant recommendations. Unrivaled personalization",
  background: HeroImage,
  buttonText: "Learn More",
  onClickButtonRedirect: "/search",
  width : "100%",
  height: "700px",

  // Hero Image Text CSS config
  titleFontSize : "42px",
  titleFontWeight : "600",
  titleWidth : "900px",
  subTitleWidth : "550px",
  subTitleFontSize : "24px",

};

export const MainRecommendationConfig: RecommendationType = {
  title: "Recommendations",
  description: "Here are your personalized recommendations",
  numberOfResults: 6,
  imageField: "image",
  pipeline: "main_rec_content",
  searchHub: "default",
  id: "Recommendation",
  active : true       // changing to "false" will hide this recommendation
};

export const VideoRecommendationConfig: RecommendationType = {
  title: "Videos",
  description: "Here are your personalized recommendations",
  numberOfResults: 6,
  imageField: "ytthumbnailurl",
  pipeline: "video_rec_content",
  searchHub: "default",
  id: "Recommendation",
  active : true      // changing to "false" will hide this recommendation
};

export const EnableAuthentication = false;

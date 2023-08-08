import HeroImage from "../assets/Tetra/HeroBanner.gif";
import Logo from "../assets/Tetra/Logo.png";
import LogoFooter from '../assets/Tetra/Footer Logo.png'
import RecommendationDefault from "../assets/Tetra/fallback_img.jpg";
import { RecommendationType } from "./Types/ConfigTypes";



/* To import your Demo Logo
1. Place the logo in the assets Folder
2. import the logo into this file using the following statement

    import DemoLogo from "../assests/<Logo-Image-filename>"  

    * it is important to add the coorect image extension type in the end of the filename e.g. DemoImage.png, DemoImage.svg or DemoImage.jpg

3. Replace the CoveoLogo with DemoLogo below.
*/

export const HeaderLogo = Logo;

export const FooterLogo = LogoFooter;

export const DefaultRecommendationImage = RecommendationDefault;



export const HeaderConfig = [
  {
    title: "Solutions",
    redirectTo: "/",
  },
  {
    title: "Insights",
    redirectTo: "/",
  },
  {
    title: "Sustainability",
    redirectTo: "/",
  },
  {
    title: "About Tetra Pak",
    redirectTo: "/",
  },
  {
    title: "Innovation",
    redirectTo: "/",
  },
];

export const HeroConfig = {
  title: "A whole new soya beverage to love",
  description:
    "Meet desires for a rich, creamy taste, higher protein, and fibre content – with zero okara waste!",
  background: HeroImage,
  buttonText: "End-to-end solutions from the soya beverage pioneers",
  onClickButtonRedirect: "/search",
  width : "80%",
  height: "700px",

  // Hero Image Text CSS config
  titleFontSize : "38px",
  titleFontWeight : "700",
  titleWidth : "100%",
  subTitleWidth : "100%",
  subTitleFontSize : "16px",

};

export const MainRecommendationConfig: RecommendationType = {
  title: "Recommendations",
  description: "Here are your personalized recommendations",
  numberOfResults: 6,
  imageField: "image",
  pipeline: "main_rec",
  searchHub: "default",
  id: "Recommendation",
  active : true       // changing to "false" will hide this recommendation
};

export const VideoRecommendationConfig: RecommendationType = {
  title: "Videos",
  description: "Here are your personalized recommendations",
  numberOfResults: 6,
  imageField: "ytthumbnailurl",
  pipeline: "video_rec",
  searchHub: "default",
  id: "Recommendation",
  active : true      // changing to "false" will hide this recommendation
};

export const EnableAuthentication = false;

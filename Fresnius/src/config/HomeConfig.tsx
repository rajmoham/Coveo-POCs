import HeroImage from "../assets/Hero.png";
import Logo from "../assets/logo.svg";
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
    title: "The Healthcare Group",
    redirectTo: "/home",
  },
  {
    title: "Stories",
    redirectTo: "/",
  },
  {
    title: "Investors",
    redirectTo: "/",
  },
  {
    title: "Media",
    redirectTo: "/",
  },
  {
    title: "Careers",
    redirectTo: "/",
  },
];

export const HeroConfig = {
  title: "A robot at the operating table",
  description:
    "Fresenius Helios uses the latest robotic technology to make surgery gentler for patients – for example at Helios Hospital Erfurt in Germany.",
  background: HeroImage,
  buttonText: "Find out more →",
  onClickButtonRedirect: "/search",
  width : "100%",
  height: "700px",

  // Hero Image Text CSS config
  titleFontSize : "32px",
  titleFontWeight : "600",
  titleWidth : "600px",
  subTitleWidth : "550px",
  subTitleFontSize : "16px",

};

export const MainRecommendationConfig: RecommendationType = {
  title: "Recommendations",
  description: "",
  numberOfResults: 6,
  imageField: "blogimage",
  pipeline: "EN_main_rec",
  searchHub: "default",
  id: "Recommendation",
  active : true       // changing to "false" will hide this recommendation
};

export const VideoRecommendationConfig: RecommendationType = {
  title: "Videos",
  description: "",
  numberOfResults: 6,
  imageField: "ytthumbnailurl",
  pipeline: "EN_video_content",
  searchHub: "default",
  id: "Recommendation",
  active : true      // changing to "false" will hide this recommendation
};

export const EnableAuthentication = false;

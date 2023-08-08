import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const Theme = {
  primary: "#274372",
  primaryText: "#282829",
  button: "#752e9c",
  buttonText : '#FFFFFF',
  secondary: "#004990",
  searchIcon: "#752e9c",
  searchTabBar: "#274372",
  searchTabBorder: "#FFFFFF",
  searchBarBackground: "#1a2840",
  searchTabText : "#FFFFFF",


  footer: "#FFFFFF",
  excerpt: "#626971",
};

const theme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: Theme.primaryText,
    },
    primary: {
      main: Theme.primary,
    },
    secondary: {
      main: Theme.secondary,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily:
      "canada-type-gibson, Gibson,Noto Sans, Avenir, Helvetica, Arial, sans-serif",
    // Material-UI uses rem units for the font size. This will change the base size for the entire search page
    // More info at https://material-ui.com/customization/typography/#font-size
    fontSize: 16,
    fontWeightRegular: "300",
    fontWeightMedium: "500",
  },
});

export default theme;

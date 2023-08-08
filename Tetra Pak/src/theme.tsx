import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const Theme = {
  primary: "#023f88",
  primaryText: "#4A4A4A",
  button: "#fff",
  buttonText : '#023f88',
  secondary: "#004990",
  searchIcon: "#752e9c",
  searchTabBar: "#023f88",
  searchTabBorder: "#FFFFFF",
  searchBarBackground: "#023f88",
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
      'Montserrat',
    // Material-UI uses rem units for the font size. This will change the base size for the entire search page
    // More info at https://material-ui.com/customization/typography/#font-size
    fontSize: 16,
    fontWeightRegular: "300",
    fontWeightMedium: "500",
  },
});

export default theme;

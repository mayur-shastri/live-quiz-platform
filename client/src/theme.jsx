import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Change this to your primary color
    },
    secondary: {
      main: '#f50057', // Change this to your secondary color
    },
  },

  typography: {
    fontFamily: 'Roboto, sans-serif', // Specify your preferred font
    fontSize: 15,
  },

  components: {
    // Customize the styles of the Button component
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Prevent text transformation in buttons
        },
      },
    },

    // Customize the styles of the TextField component
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '8px 0', // Add margin to TextField components
        },
      },
    },

    // Add more component customizations as needed
  },
});

export default theme;
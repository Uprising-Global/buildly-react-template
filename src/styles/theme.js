import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme(({
  palette: {
    primary: {
      main: '#6216ff',
      hover: '#fff',
      contrastText: '#d6d6d6',
    },
    secondary: {
      main: '#ef2563',
      hover: '#fff',
      contrastText: '#d6d6d6',
    },
  },
  typography: {
    root: {
      color: '#d6d6d6 !important',
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          padding: 0,
          color: '#d6d6d',
          fontFamily: 'Archivo',
          fontWeight: 200,
          fontSize: '1rem',
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          color: '#000',
          backgroundColor: 'transparent',
        },
      },
    },
  },
}));

export default responsiveFontSizes(theme);

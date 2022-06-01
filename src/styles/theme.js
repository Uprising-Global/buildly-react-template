import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme(({
  palette: {
    primary: {
      main: '#ef2563',
      contrastText: '#d6d6d6',
    },
    secondary: {
      main: '#6216ff',
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
  },
}));

export default responsiveFontSizes(theme);

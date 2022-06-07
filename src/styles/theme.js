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
          height: '100vh',
          backgroundColor: '#091314',
          color: '#d6d6d6',
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
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.7)',
          '&.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.5)',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#fff',
          borderBottom: '1px solid #d6d6d6',
        },
        input: {
          '&.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.5)',
            WebkitTextFillColor: 'unset !important',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          '&.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.5)',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
        },
        // '& .Mui-disabled': {
        //   color: 'rgba(255, 255, 255, 0.5) !important',
        //   backgroundColor: 'rgba(255, 255, 255, 0.3) !important',
        // },
      },
    },
  },
}));

export default responsiveFontSizes(theme);

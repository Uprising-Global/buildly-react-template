import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme(({
  palette: {
    primary: {
      main: '#3E66FB',
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
    fontSize: 16,
    root: {
      fontFamily: 'ArchivoBody',
      fontWeight: 700,
      color: '#d6d6d6 !important',
    },
    h1: {
      fontFamily: 'ArchivoHeading',
      fontWeight: 900,
    },
    h2: {
      fontFamily: 'ArchivoHeading',
      fontWeight: 900,
    },
    h3: {
      fontFamily: 'ArchivoHeading',
      fontWeight: 900,
    },
    h4: {
      fontFamily: 'ArchivoHeading',
      fontWeight: 900,
    },
    h5: {
      fontFamily: 'ArchivoHeading',
      fontWeight: 900,
    },
    h6: {
      fontFamily: 'ArchivoHeading',
      fontWeight: 900,
    },
    subtitle1: {
      fontFamily: 'ArchivoSubHeading',
      fontWeight: 800,
    },
    subtitle2: {
      fontFamily: 'ArchivoSubHeading',
      fontWeight: 800,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': {
          fontFamily: 'ArchivoHeading',
          src: "url('../assets/fonts/Archivo_Expanded-Black.ttf') format('truetype')",
        },
        '@font-face': {
          fontFamily: 'ArchivoSubHeading',
          src: "url('../assets/fonts/Archivo_Expanded-SemiBoldItalic.ttf') format('truetype')",
        },
        '@font-face': {
          fontFamily: 'ArchivoBody',
          src: "url('../assets/fonts/Archivo_Expanded-ExtraLight.ttf') format('truetype')",
        },
      },
      styleOverrides: {
        body: {
          padding: 0,
          height: '100vh',
          backgroundColor: '#091314',
          color: '#d6d6d6',
          fontFamily: 'ArchivoBody',
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
        },
        input: {
          '&.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.5)',
            WebkitTextFillColor: 'unset !important',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          borderBottom: '1px solid #d6d6d6',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: '1px solid #d6d6d6',
          borderRadius: '8px',
          backgroundColor: '#d6d6d6',
          color: '#000',
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
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#d6d6d6',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#d6d6d6',
          borderBottom: '1px solid rgba(81, 81, 81, 1)',
          '& .MuiButton-root:hover': {
            backgroundColor: '#3E66FB',
          },
          '& .MuiButtonBase-root': {
            color: '#d6d6d6',
            '&.Mui-disabled': {
              color: '#d6d6d6',
              opacity: 0.5,
            },
          },
        },
        head: {
          backgroundColor: '#ef2563 !important',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        track: {
          backgroundColor: '#d6d6d6',
        },
        switchBase: {
          '&.Mui-disabled': {
            '+.MuiSwitch-track': {
              opacity: 0.3,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          color: '#d6d6d6',
          border: '1px solid #d6d6d6',
        },
      },
    },
  },
}));

export default responsiveFontSizes(theme);

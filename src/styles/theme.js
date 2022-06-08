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
  },
}));

export default responsiveFontSizes(theme);

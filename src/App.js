import * as React from 'react';
import 'react-notifications/lib/notifications.css';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { CssBaseline, ThemeProvider, StyledEngineProvider } from '@mui/material';
import ContainerDashboard from './layout/Container/Container';
import theme from './styles/theme';
import Alert from './components/Alert/Alert';

const App = () => (
  <Router>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className="app">
          <CssBaseline />
          <Route path="" component={ContainerDashboard} />
        </div>
        <Alert />
      </ThemeProvider>
    </StyledEngineProvider>
  </Router>
);

export default hot(module)(App);

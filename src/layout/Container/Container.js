import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext, getUser } from '@context/User.context';
import TopBar from '@layout/TopBar/TopBar';
import Profile from '@pages/Profile/Profile';
import UserManagement from '@pages/UserManagement/UserManagement';
import makeStyles from '@mui/styles/makeStyles';
import { routes } from '@routes/routesConstants';
import { oauthService } from '@modules/oauth/oauth.service';
import Login from '@pages/Login/Login';
import Register from '@pages/Register/Register';
import ForgotPassword from '@pages/ForgotPassword/ForgotPassword';
import ResetPassword from '@pages/ResetPassword/ResetPassword';
import { PrivateRoute } from '@routes/Private.route';
import BottomBar from '@layout/BottomBar/BottomBar';
import Home from '@pages/Home/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}));

/**
 * Container for the app layout when the user is authenticated.
 */
const Container = ({ location, history }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <UserContext.Provider value={getUser()}>
        <TopBar
          location={location}
          history={history}
        />
        <div className={classes.content}>
          <Route exact path={routes.HOME} component={Home} />
          <Route path={routes.LOGIN} component={Login} />
          <Route path={routes.REGISTER} component={Register} />
          <Route path={routes.FORGOT_PASSWORD} component={ForgotPassword} />
          <Route path={routes.RESET_PASSWORD} component={ResetPassword} />
          <PrivateRoute path={routes.DASHBOARD} component={Profile} />
          <PrivateRoute path={routes.USER_MANAGEMENT} component={UserManagement} />
        </div>
        <BottomBar />
      </UserContext.Provider>
    </div>
  );
};

export default Container;

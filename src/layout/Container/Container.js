import React from 'react';
import { Route } from 'react-router-dom';
import { UserContext, getUser } from '@context/User.context';
import TopBar from '@layout/TopBar/TopBar';
import UserManagement from '@pages/UserManagement/UserManagement';
import makeStyles from '@mui/styles/makeStyles';
import { routes } from '@routes/routesConstants';
import Login from '@pages/Login/Login';
import Register from '@pages/Register/Register';
import ForgotPassword from '@pages/ForgotPassword/ForgotPassword';
import ResetPassword from '@pages/ResetPassword/ResetPassword';
import { PrivateRoute } from '@routes/Private.route';
import BottomBar from '@layout/BottomBar/BottomBar';
import Home from '@pages/Home/Home';
import Jobs from '@pages/Jobs/Jobs';
import Faqs from '@pages/Faqs/Faqs';
import PrivacyPolicy from '@pages/PrivacyPolicy/PrivacyPolicy';
import Projects from '@pages/Projects/Projects';
import Blogs from '@pages/Blogs/Blogs';
import FilmDetails from '@pages/FilmDetails/FilmDetails';
import UpdateDetails from '@pages/FilmDetails/components/UpdateDetails';
import Dashboard from '@pages/Dashboard/Dashboard';

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
          <Route
            exact
            path={`${routes.FILM}/:film_uuid`}
            component={FilmDetails}
          />
          <Route
            exact
            path={`${routes.FILM_UPDATE}/:update_uuid`}
            component={UpdateDetails}
          />
          <Route path={routes.LOGIN} component={Login} />
          <Route path={routes.REGISTER} component={Register} />
          <Route path={routes.FORGOT_PASSWORD} component={ForgotPassword} />
          <Route path={routes.RESET_PASSWORD} component={ResetPassword} />
          <Route path={routes.PROJECTS} component={Projects} />
          <Route path={routes.LEARN} component={Blogs} />
          <Route path={routes.JOBS} component={Jobs} />
          <Route path={routes.FAQS} component={Faqs} />
          <Route path={routes.PRIVACY_POLICY} component={PrivacyPolicy} />
          <PrivateRoute path={routes.DASHBOARD} component={Dashboard} />
          <PrivateRoute path={routes.USER_MANAGEMENT} component={UserManagement} />
          <Route exact path={routes.HOME} component={Home} />
        </div>
        <BottomBar />
      </UserContext.Provider>
    </div>
  );
};

export default Container;

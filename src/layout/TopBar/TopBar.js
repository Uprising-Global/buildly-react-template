import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GroupIcon from '@mui/icons-material/Group';
import logo from '@assets/topbar-logo.png';
import { logout } from '@redux/authuser/authuser.actions';
import { routes } from '@routes/routesConstants';
import { checkForAdmin, checkForGlobalAdmin } from '@utils/utilMethods';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#2A3744',
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: {
    maxWidth: 50,
    objectFit: 'contain',
  },
  menuRight: {
    marginLeft: 'auto',
  },
  menuIcon: {
    color: '#fff',
  },
  paper: {
    border: '1px solid',
  },
}));

/**
 * Component for the top bar header.
 */
const TopBar = ({
  history,
  location,
  dispatch,
  data,
}) => {
  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (data && data.data) {
      const user = data.data;
      setLoggedIn(true);
      setIsAdmin(checkForAdmin(user) || checkForGlobalAdmin(user));
    }
  }, [data]);

  const handleLogoutClick = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Link to={routes.DASHBOARD}>
          <img src={logo} className={classes.logo} alt="Company text logo" />
        </Link>

        {isLoggedIn && (
        <div className={classes.menuRight}>
          {isAdmin && (
          <Link to={routes.USER_MANAGEMENT}>
            <IconButton aria-label="user-management" color="inherit">
              <GroupIcon fontSize="large" className={classes.menuIcon} />
            </IconButton>
          </Link>
          )}
          <IconButton aria-label="logout" color="inherit" onClick={handleLogoutClick}>
            <ExitToAppIcon fontSize="large" className={classes.menuIcon} />
          </IconButton>
        </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state.authReducer,
});

export default connect(mapStateToProps)(TopBar);

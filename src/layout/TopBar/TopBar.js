import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import logo from '@assets/topbar-logo.png';
import { logout } from '@redux/authuser/authuser.actions';
import { routes } from '@routes/routesConstants';
import { checkForAdmin, checkForGlobalAdmin } from '@utils/utilMethods';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: 'radial-gradient(89.88% 89.88% at 50% 10.12%, rgba(0, 0, 0, 0.833) 0%, rgba(0, 0, 0, 0.6174) 100%)',
    zIndex: theme.zIndex.drawer + 1,
    backdropFilter: `blur(${theme.spacing(10)})`,
  },
  logo: {
    maxWidth: theme.spacing(25),
    objectFit: 'contain',
  },
  menuButton: {
    marginLeft: 'auto',
    backgroundColor: theme.palette.primary.contrastText,
    borderRadius: theme.spacing(2.125),
    '&:hover': {
      backgroundColor: theme.palette.primary.hover,
    },
  },
  menuIcon: {
    color: 'black',
    marginRight: theme.spacing(0.5),
  },
  menuLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  navActive: {
    color: `${theme.palette.secondary.main} !important`,
  },
  navLink: {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
    letterSpacing: theme.spacing(0.003),
    marginLeft: theme.spacing(2),
  },
  navLinkSeparator: {
    padding: theme.spacing(0.25),
    backgroundColor: theme.palette.secondary.main,
    marginLeft: theme.spacing(2),
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
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (data) {
      const user = data;
      setLoggedIn(true);
      setIsAdmin(checkForAdmin(user) || checkForGlobalAdmin(user));
    } else {
      setLoggedIn(false);
    }
  }, [data]);

  const handleLogoutClick = () => {
    dispatch(logout());
    history.push('/');
    setAnchorEl(null);
  };

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Link to={routes.HOME}>
          <img src={logo} className={classes.logo} alt="Company text logo" />
        </Link>
        <Link className={classes.navLink} to={routes.PROJECTS}>
          Projects
        </Link>
        <Link className={classes.navLink} to={routes.LEARN}>
          Learn
        </Link>

        {!isLoggedIn && (
          <div className={classes.navRight}>
            <NavLink
              to={routes.LOGIN}
              activeClassName={classes.navActive}
              title="Log in"
              className={classes.navLink}
            >
              Log in
            </NavLink>
            <div className={classes.navLinkSeparator} />
            <NavLink
              to={routes.REGISTER}
              activeClassName={classes.navActive}
              title="Sign up"
              className={classes.navLink}
            >
              Sign up
            </NavLink>
          </div>
        )}

        {isLoggedIn && (
        <Button
          aria-label="menu section"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          color="inherit"
          className={classes.menuButton}
        >
          <MenuIcon fontSize="small" className={classes.menuIcon} />
          <Avatar sx={{ width: 24, height: 24 }} />
        </Button>
        )}
        <Menu
          id="customized-admin"
          anchorEl={anchorEl}
          keepMounted
          open={!!anchorEl}
          onClose={(e) => setAnchorEl(null)}
          color="inherit"
        >
          {isAdmin && (
          <MenuItem onClick={(e) => setAnchorEl(null)}>
            <ManageAccountsIcon className={classes.menuIcon} fontSize="small" />
            <Link className={classes.menuLink} to={routes.USER_MANAGEMENT}>
              <ListItemText primary="User Management" />
            </Link>
          </MenuItem>
          )}
          {isAdmin && <Divider />}
          <MenuItem onClick={handleLogoutClick}>
            <LogoutIcon className={classes.menuIcon} fontSize="small" />
            <ListItemText primary="LogOut" />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state.authReducer,
});

export default connect(mapStateToProps)(TopBar);

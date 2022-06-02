import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  },
  logo: {
    maxWidth: 50,
    objectFit: 'contain',
  },
  links: {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
    fontWeight: 700,
    letterSpacing: theme.spacing(0.003),
    marginLeft: theme.spacing(2),
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
    if (data && data.data) {
      const user = data.data;
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
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Link to={routes.HOME}>
          <img src={logo} className={classes.logo} alt="Company text logo" />
        </Link>
        <Link className={classes.links} to={routes.PROJECTS}>
          Projects
        </Link>
        <Link className={classes.links} to={routes.LEARN}>
          Learn
        </Link>

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
          <>
            <MenuItem onClick={(e) => setAnchorEl(null)}>
              <ManageAccountsIcon className={classes.menuIcon} fontSize="small" />
              <Link className={classes.menuLink} to={routes.USER_MANAGEMENT}>
                <ListItemText primary="User Management" />
              </Link>
            </MenuItem>
            <Divider />
          </>
          )}
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

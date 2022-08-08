import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import {
  Box, Grid, Tabs, Tab, Button, Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { updateProfile } from '@redux/authuser/authuser.actions';
import { routes } from '@routes/routesConstants';
import General from './General/General';
import Profile from './Profile/Profile';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `0 ${theme.spacing(10)}`,
  },
  upload: {
    height: theme.spacing(20),
  },
  userAvatar: {
    width: theme.spacing(20),
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.contrastText}`,
  },
  button: {
    margin: `${theme.spacing(1)} ${theme.spacing(1)}`,
  },
  tabs: {
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
    padding: `0 ${theme.spacing(20)}`,
  },
}));

const Dashboard = ({ history, dispatch, user }) => {
  const classes = useStyles();
  const subNav = [
    { label: 'General', value: 'general' },
    { label: 'Profile', value: 'profile' },
  ];
  const viewPath = (subNav.find((item) => location.pathname.endsWith(item.value))
  || subNav[1]).value;
  const [view, setView] = useState(viewPath);
  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState(null);

  // this will be triggered whenever the content switcher is clicked to change the view
  useEffect(() => {
    history.push(`/app/dashboard/${view || location.state}`);
  }, [view]);

  // eslint-disable-next-line no-shadow
  const viewTabClicked = (event, view) => {
    setView(view);
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleCancel = (event) => {
    hiddenFileInput.current.value = null;
    setFile(null);
  };

  const handleUpdate = (event) => {
    const formData = new FormData();
    if (file) {
      formData.append('file', file[0], file[0].name);
    }
    formData.append('organization_name', user.organization.name);
    dispatch(updateProfile(user.id, formData));
    hiddenFileInput.current.value = null;
    setFile(null);
  };

  return (
    <Box mt={1} mb={3} style={{ padding: '6em 3em' }}>
      <Grid mb={3} container className={classes.container}>
        <Grid item xs={12} textAlign="center" mb={1.5}>
          {user && !user.avatar_url && !file && (
            <Button variant="outlined" component="label" className={`${classes.upload} ${classes.userAvatar}`} onClick={handleClick}>
              {(file && file[0] && file[0].name) || 'Upload'}
            </Button>
          )}
          {user && user.avatar_url && !file && (
            <Button onClick={handleClick}>
              <img src={user.avatar_url} alt={user.first_name} className={classes.userAvatar} />
            </Button>
          )}
          {file && file[0] && (
            <>
              <Button onClick={handleClick}>
                <img
                  src={URL.createObjectURL(file[0])}
                  alt={file[0].name}
                  className={classes.userAvatar}
                />
              </Button>
              <div>
                <Button className={classes.button} type="button" variant="contained" onClick={handleUpdate}>
                  Update
                </Button>
                <Button className={classes.button} type="button" variant="contained" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </>
          )}
          <input ref={hiddenFileInput} hidden accept="image/*" type="file" onChange={(e) => setFile(e.target.files)} />
        </Grid>
        <Grid item xs={12} textAlign="center" mb={3}>
          <Typography variant="h6" component="h6">
            {`${user.first_name} ${user.last_name}`}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Tabs value={view} onChange={viewTabClicked} className={classes.tabs}>
            {subNav.map((itemProps, index) => <Tab {...itemProps} key={`tab${index}:${itemProps.value}`} />)}
          </Tabs>
        </Grid>
      </Grid>
      <Route path={routes.GENERAL} component={General} />
      <Route path={routes.PROFILE} component={Profile} />
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state.authReducer,
  user: state.authReducer.data,
});

export default connect(mapStateToProps)(Dashboard);

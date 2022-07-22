import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Box, Grid, Tabs, Tab } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { routes } from '@routes/routesConstants';
import General from './General/General';
import Profile from './Profile/Profile';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `0 ${theme.spacing(10)}`,
  },
  tabs: {
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
    padding: `0 ${theme.spacing(20)}`,
  },
}));

const Dashboard = ({ history }) => {
  const classes = useStyles();
  const subNav = [
    { label: 'General', value: 'general' },
    { label: 'Profile', value: 'profile' },
  ];
  const viewPath = (subNav.find((item) => location.pathname.endsWith(item.value))
  || subNav[1]).value;
  const [view, setView] = useState(viewPath);

  // this will be triggered whenever the content switcher is clicked to change the view
  useEffect(() => {
    history.push(`/app/dashboard/${view || location.state}`);
  }, [view]);

  // eslint-disable-next-line no-shadow
  const viewTabClicked = (event, view) => {
    setView(view);
  };

  return (
  <Box mt={1} mb={3} style={{ padding: '6em 3em' }}>
    <Grid mb={3} container className={classes.container}>
      <Grid item xs={12}>
        <Tabs value={view} onChange={viewTabClicked} className={classes.tabs}>
          {subNav.map((itemProps, index) => <Tab {...itemProps} key={`tab${index}:${itemProps.value}`} />)}
        </Tabs>
      </Grid>
    </Grid>
    <Route path={routes.GENERAL} component={General} />
    <Route path={routes.PROFILE} component={Profile} />
  </Box>
  )
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});

export default connect(mapStateToProps)(Dashboard);

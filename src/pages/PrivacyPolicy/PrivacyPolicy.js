import React from 'react';
import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8),
    paddingTop: '6em',
  },
  body: {
    padding: theme.spacing(4),
  },
}));

const PrivacyPolicy = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h3">
        PrivacyPolicy
      </Typography>
      <Typography className={classes.body} variant="body1">
        Privacy Policy details will be available here.
      </Typography>
    </div>
  );
};

export default PrivacyPolicy;

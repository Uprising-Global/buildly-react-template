import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';

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

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

const Jobs = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h3">
        Jobs
      </Typography>
      <Typography className={classes.body} variant="body1">
        We're not looking for anyone right now but we're open to submissions at
        {' '}
        <a href="mailto:jobs@uprising.global">jobs@uprising.global</a>
      </Typography>
    </div>
  );
};

export default Jobs;

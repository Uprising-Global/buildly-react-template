import React from 'react';
import { Link } from 'react-router-dom';
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

const Jobs = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography component="h3" variant="h3">
        Jobs
      </Typography>
      <Typography className={classes.body} component="div" variant="body1">
        We're not looking for anyone right now but we're open to submissions at
        {' '}
        <Link href="mailto:jobs@uprising.global">jobs@uprising.global</Link>
      </Typography>
    </div>
  );
};

export default Jobs;

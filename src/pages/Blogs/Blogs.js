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

const Blogs = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h3">
        Blogs
      </Typography>
      <Typography className={classes.body} variant="body1">
        Blogs will be available here.
      </Typography>
    </div>
  );
};

export default Blogs;

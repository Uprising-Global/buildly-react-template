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

const Blogs = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography component="h3" variant="h3">
        Blogs
      </Typography>
      <Typography className={classes.body} component="div" variant="body1">
        Blogs will be available here.
      </Typography>
    </div>
  );
};

export default Blogs;

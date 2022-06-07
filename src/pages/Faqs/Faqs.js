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

const Faqs = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography component="h3" variant="h3">
        FAQS
      </Typography>
      <Typography className={classes.body} component="div" variant="body1">
        FAQ(s) will be available here.
      </Typography>
    </div>
  );
};

export default Faqs;

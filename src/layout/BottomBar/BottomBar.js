import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles((theme) => ({
  appBar: {
    padding: theme.spacing(2),
  },
}));

/**
 * Component for the top bar header.
 */
const BottomBar = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.appBar}>
      <Grid item xs={12}>
        Test Title
      </Grid>
    </Grid>
  );
};

export default BottomBar;

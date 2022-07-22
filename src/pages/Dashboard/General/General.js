import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `0 ${theme.spacing(32)}`,
  },
}));

const General = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      General
    </div>
  );
};

export default General;

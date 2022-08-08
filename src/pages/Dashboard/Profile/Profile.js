import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import Loader from '@components/Loader/Loader';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `0 ${theme.spacing(32)}`,
  },
  displayData: {
    paddingTop: theme.spacing(2.5),
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
    '&:nth-child(even)': {
      textAlign: 'end',
    },
  },
}));

const Profile = ({ loading, user }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {loading && <Loader open={loading} />}
      <Grid container>
        <Grid item xs={6} className={classes.displayData}>
          <Typography variant="body1" component="div">
            Email
          </Typography>
        </Grid>

        <Grid item xs={6} className={classes.displayData}>
          <Typography variant="body1" component="div">
            {user.email}
          </Typography>
        </Grid>

        <Grid item xs={6} className={classes.displayData}>
          <Typography variant="body1" component="div">
            Display name
          </Typography>
        </Grid>

        <Grid item xs={6} className={classes.displayData}>
          <Typography variant="body1" component="div">
            {`${user.first_name} ${user.last_name}`}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state.authReducer,
  user: state.authReducer.data,
});

export default connect(mapStateToProps)(Profile);

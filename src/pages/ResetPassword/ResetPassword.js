import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import { useInput } from '@hooks/useInput';
import { resetPassword } from '@redux/authuser/authuser.actions';
import Grid from '@mui/material/Grid';
import { validators } from '@utils/validators';
import { isMobile } from '@utils/mediaQuery';
import { routes } from '@routes/routesConstants';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  textField: {
    minHeight: '5rem',
    margin: theme.spacing(1, 0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: theme.spacing(2.125),
    width: 'max-content',
    padding: '0.3rem 2rem',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  loadingWrapper: {
    margin: theme.spacing(2),
    position: 'relative',
    textAlign: 'center',
  },
}));

const ResetPassword = ({
  dispatch, loading, history, loaded, error, location,
}) => {
  const classes = useStyles();
  const password = useInput('', { required: true });
  const re_password = useInput('', {
    required: true,
    confirm: true,
    matchField: password,
  });

  const [formError, setFormError] = useState({});

  /**
   * Submit the form to the backend and attempts to change password
   * @param {Event} event the default submit event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const [uid, token] = location.pathname.substring(
      location.pathname.indexOf(routes.RESET_PASSWORD) + 1,
      location.pathname.lastIndexOf('/'),
    ).split('/').slice(1);
    if (location.pathname.includes(routes.RESET_PASSWORD)) {
      const resetPasswordFormValue = {
        new_password1: password.value,
        new_password2: re_password.value,
        uid,
        token,
      };
      dispatch(resetPassword(resetPasswordFormValue, history));
    }
  };

  /**
   * Handle input field blur event
   * @param {Event} e Event
   * @param {String} validation validation type if any
   * @param {Object} input input field
   */

  const handleBlur = (e, validation, input) => {
    const validateObj = validators(validation, input);
    const prevState = { ...formError };
    if (validateObj && validateObj.error) {
      setFormError({
        ...prevState,
        [e.target.id]: validateObj,
      });
    } else {
      setFormError({
        ...prevState,
        [e.target.id]: {
          error: false,
          message: '',
        },
      });
    }
  };

  const submitDisabled = () => {
    const errorKeys = Object.keys(formError);
    if (!password.value || !re_password.value) {
      return true;
    }
    let errorExists = false;
    errorKeys.forEach((key) => {
      if (formError[key].error) errorExists = true;
    });
    return errorExists;
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reset your Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={isMobile() ? 0 : 2}>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="current-password"
                className={classes.textField}
                error={formError.password && formError.password.error}
                helperText={
                  formError.password ? formError.password.message : ''
                }
                onBlur={(e) => handleBlur(e, 'required', password)}
                {...password.bind}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="re_password"
                label="Confirm Password"
                name="re_password"
                type="password"
                autoComplete="re_password"
                className={classes.textField}
                error={formError.re_password && formError.re_password.error}
                helperText={
                  formError.re_password ? formError.re_password.message : ''
                }
                onBlur={(e) => handleBlur(e, 'confirm', re_password)}
                {...re_password.bind}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs align="right">
              <Link
                href={routes.REGISTER}
                variant="body2"
                color="primary"
              >
                Go back to Sign in
              </Link>
            </Grid>
          </Grid>
          <div className={classes.loadingWrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading || submitDisabled()}
            >
              Reset Password
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                className={classes.buttonProgress}
              />
            )}
          </div>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state.authReducer,
});

export default connect(mapStateToProps)(ResetPassword);

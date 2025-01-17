import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button, CssBaseline, CircularProgress, Container, Grid, Link, TextField, Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useInput } from '@hooks/useInput';
import { register } from '@redux/authuser/authuser.actions';
import { validators } from '@utils/validators';
import { isMobile } from '@utils/mediaQuery';
import { routes } from '@routes/routesConstants';
import backImage from '@assets/background-image.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '6em 0',
    backgroundImage: `url(${backImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: theme.spacing(2.125),
    width: 'max-content',
    padding: '0.3rem 2rem',
  },
  textField: {
    minHeight: '5rem',
    margin: '0.25rem 0',
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
  link: {
    textDecoration: 'none',
  },
}));

const Register = ({
  dispatch, loading, history,
}) => {
  const classes = useStyles();
  const email = useInput('', { required: true });
  const password = useInput('', { required: true });
  const re_password = useInput('', {
    required: true,
    confirm: true,
    matchField: password,
  });
  const first_name = useInput('', { required: true });
  const last_name = useInput('');
  const [formError, setFormError] = useState({});

  /**
   * Submit the form to the backend and attempts to authenticate
   * @param {Event} event the default submit event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    location.register = true;
    const registerFormValue = {
      username: email.value,
      email: email.value,
      password: password.value,
      first_name: first_name.value,
      last_name: last_name.value,
    };
    dispatch(register(registerFormValue, history));
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
    if (
      !password.value
      || !email.value
      || !re_password.value
      || !first_name.value
    ) {
      return true;
    }
    let errorExists = false;
    errorKeys.forEach((key) => {
      if (formError[key].error) errorExists = true;
    });
    return errorExists;
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography variant="h5">
            Register
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={isMobile() ? 0 : 3}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  name="first_name"
                  autoComplete="first_name"
                  error={formError.first_name && formError.first_name.error}
                  helperText={
                    formError.first_name ? formError.first_name.message : ''
                  }
                  className={classes.textField}
                  onBlur={(e) => handleBlur(e, 'required', first_name)}
                  {...first_name.bind}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  margin="normal"
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="last_name"
                  error={formError.last_name && formError.last_name.error}
                  helperText={
                    formError.last_name ? formError.last_name.message : ''
                  }
                  className={classes.textField}
                  onBlur={(e) => handleBlur(e)}
                  {...last_name.bind}
                />
              </Grid>
            </Grid>
            <Grid container spacing={isMobile() ? 0 : 3}>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  error={formError.email && formError.email.error}
                  helperText={formError.email ? formError.email.message : ''}
                  className={classes.textField}
                  onBlur={(e) => handleBlur(e, 'email', email)}
                  {...email.bind}
                />
              </Grid>
            </Grid>
            <Grid container spacing={isMobile() ? 0 : 3}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={formError.password && formError.password.error}
                  helperText={
                    formError.password ? formError.password.message : ''
                  }
                  className={classes.textField}
                  onBlur={(e) => handleBlur(e, 'required', password)}
                  {...password.bind}
                />
              </Grid>

              <Grid item xs={12} md={6}>
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
                  error={formError.re_password && formError.re_password.error}
                  helperText={
                    formError.re_password ? formError.re_password.message : ''
                  }
                  className={classes.textField}
                  onBlur={(e) => handleBlur(e, 'confirm', re_password)}
                  {...re_password.bind}
                />
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
                Sign Up
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
            <Grid container>
              <Grid item xs align="center">
                {'Already have an account? '}
                <Link
                  href={routes.LOGIN}
                  variant="body2"
                  color="primary"
                  className={classes.link}
                >
                  Log in here
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state.authReducer,
});

export default connect(mapStateToProps)(Register);

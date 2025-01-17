import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Grid, TextField, Typography,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';
import logo from '@assets/logo.png';
import { useInput } from '@hooks/useInput';
import { validators } from '@utils/validators';
import { routes } from '@routes/routesConstants';
import { connect } from 'react-redux';
import { addSubscriber } from '@redux/authuser/authuser.actions';

const useStyles = makeStyles((theme) => ({
  appBar: {
    padding: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: theme.spacing(6),
    alignItems: 'center',
    justifyItems: 'center',
  },
  logo: {
    width: theme.spacing(8),
    objectFit: 'contain',
  },
  caption: {
    marginTop: theme.spacing(2),
  },
  gridLeft: {
    width: '100%',
    marginLeft: '160px',
  },
  gridRight: {
    width: '100%',
    marginRight: '160px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    textAlign: 'right',
    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary.contrastText,
    },
  },
  subscriber: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'baseline',
    gridColumnGap: '16px',
  },
  submit: {
    width: 'max-content',
  },
  links: {
    display: 'grid',
    gridRowGap: theme.spacing(1),
  },
  findUs: {
    marginBottom: theme.spacing(0.75),
  },
  social: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
}));

/**
 * Component for the top bar header.
 */
const BottomBar = ({ dispatch }) => {
  const classes = useStyles();
  const email = useInput('', { required: true });
  const [error, setError] = useState({});

  /**
   * Handle input field blur event
   * @param {Event} e Event
   * @param {String} validation validation type if any
   * @param {Object} input input field
   */

  const handleBlur = (e, validation, input) => {
    const validateObj = validators(validation, input);
    const prevState = { ...error };
    if (validateObj && validateObj.error) {
      setError({
        ...prevState,
        [e.target.id]: validateObj,
      });
    } else {
      setError({
        ...prevState,
        [e.target.id]: {
          error: false,
          message: '',
        },
      });
    }
  };

  const submitDisabled = () => {
    const errorKeys = Object.keys(error);
    if (!email.value) {
      return true;
    }
    let errorExists = false;
    errorKeys.forEach((key) => {
      if (error[key].error) errorExists = true;
    });
    return errorExists;
  };

  /**
   * Submit the form to the backend and attempts to authenticate
   * @param {Event} event the default submit event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { email: email.value };
    email.reset();
    dispatch(addSubscriber(data));
  };

  return (
    <Grid container className={classes.appBar}>
      <Grid item className={classes.gridLeft}>
        <img className={classes.logo} src={logo} alt="Uprising Logo" />
        <Typography variant="body1">
          <b>UPRISING</b>
          {' '}
          is a film investment
        </Typography>
        <Typography variant="body1">
          platform for everyone.
        </Typography>
        <Typography variant="body1" className={classes.caption}>
          Tell your story.
        </Typography>
      </Grid>
      <Grid item className={classes.gridRight}>
        <Grid item className={classes.links}>
          <Link to={routes.HOME}>About Us</Link>
          <Link to={routes.LEARN}>Blog</Link>
          <Link to={routes.HOME}>Contact</Link>
          <Link to={routes.JOBS}>Jobs</Link>
        </Grid>
        <Grid item className={classes.links}>
          <Link to={routes.FAQS}>Investor FAQ</Link>
          <Link to={routes.FAQS}>Filmmaker FAQ</Link>
          <Link to={routes.FAQS}>Raise Funding</Link>
          <Link to={routes.PRIVACY_POLICY}>Privacy Policy</Link>
        </Grid>
      </Grid>
      <Grid item className={classes.gridLeft}>
        <Typography variant="caption">
          Subscribe to Uprising
        </Typography>
        <form className={classes.subscriber} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="subscription-email"
            placeholder="Your e-mail"
            name="email"
            autoComplete="email"
            error={error.email && error.email.error}
            helperText={error && error.email ? error.email.message : ''}
            onBlur={(e) => handleBlur(e, 'email', email)}
            {...email.bind}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={submitDisabled()}
          >
            Subscribe
          </Button>
        </form>
      </Grid>
      <Grid item className={classes.gridRight}>
        <Typography variant="body1" className={classes.findUs}>
          Find us at:
        </Typography>
        <div className={classes.social}>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <YouTubeIcon fontSize="small" />
          </a>
          <a href="https://www.instagram.com/uprising.global/" target="_blank" rel="noopener noreferrer">
            <InstagramIcon fontSize="small" />
          </a>
          <a href="https://www.facebook.com/uprising.global" target="_blank" rel="noopener noreferrer">
            <FacebookIcon fontSize="small" />
          </a>
          <a href="https://www.linkedin.com/company/uprising-global" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon fontSize="small" />
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <TwitterIcon fontSize="small" />
          </a>
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});

export default connect(mapStateToProps)(BottomBar);

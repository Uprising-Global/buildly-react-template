import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import logo from '@assets/logo.png';
import { useInput } from '@hooks/useInput';
import { validators } from '@utils/validators';
import { routes } from '@routes/routesConstants';

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
    paddingRight: '160px',
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
const BottomBar = () => {
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

  return (
    <Grid container className={classes.appBar}>
      <Grid item className={classes.gridLeft}>
        <img className={classes.logo} src={logo} alt="Uprising Logo" />
        <Typography component="div" variant="body1">
          <b>UPRISING</b>
          {' '}
          is a film investment
        </Typography>
        <Typography component="div" variant="body1">
          platform for everyone.
        </Typography>
        <Typography component="div" variant="body1" className={classes.caption}>
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
        <Typography component="div" variant="caption">
          Subscribe to Uprising
        </Typography>
        <div className={classes.subscriber}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="email"
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
        </div>
      </Grid>
      <Grid item className={classes.gridRight}>
        <Typography component="div" variant="body1" className={classes.findUs}>
          Find us at:
        </Typography>
        <div className={classes.social}>
          <Link to="/" target="_blank" rel="noopener noreferrer">
            <YouTubeIcon fontSize="small" />
          </Link>
          <Link to="https://www.instagram.com/uprising.global/" target="_blank" rel="noopener noreferrer">
            <InstagramIcon fontSize="small" />
          </Link>
          <Link to="https://www.facebook.com/uprising.global" target="_blank" rel="noopener noreferrer">
            <FacebookIcon fontSize="small" />
          </Link>
          <Link to="https://www.linkedin.com/company/uprising-global" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon fontSize="small" />
          </Link>
          <Link to="/" target="_blank" rel="noopener noreferrer">
            <TwitterIcon fontSize="small" />
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default BottomBar;

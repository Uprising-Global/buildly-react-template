import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import {
  Button, Grid, TextField, Typography,
} from '@mui/material';
import Loader from '@components/Loader/Loader';
import { updateProfile } from '@redux/authuser/authuser.actions';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `0 ${theme.spacing(32)}`,
  },
  upload: {
    width: '100%',
    padding: `${theme.spacing(10)} ${theme.spacing(5)}`,
    color: '#96C8ED',
    borderColor: '#96C8ED',
    borderStyle: 'dashed',
  },
  uploadText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  finish: {
    float: 'right',
  },
}));

const Profile = ({ loading, user, dispatch }) => {
  const classes = useStyles();
  const hiddenFileInput = useRef(null);
  const [aboutMe, setAboutMe] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (user) {
      setAboutMe(user.about_me);
    }
  }, [user]);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleFinish = (event) => {
    const formData = new FormData();
    if (file) {
      formData.append('file', file[0], file[0].name);
    }
    formData.append('about_me', aboutMe);
    formData.append('organization_name', user.organization.name);
    dispatch(updateProfile(user.id, formData));
    setFile(null);
    setAboutMe('');
  };

  return (
    <div className={classes.container}>
      {loading && <Loader open={loading} />}
      <Grid container>
        <Grid item xs={3} mb={6}>
          {user && !user.avatar_url && (
            <Button variant="outlined" component="label" className={classes.upload} onClick={handleClick}>
              {(file && file[0] && file[0].name) || 'Upload'}
            </Button>
          )}
          {user && user.avatar_url && (
            <>
              <Button onClick={handleClick}>
                <img src={user.avatar_url} alt={user.first_name} width="100%" />
              </Button>
              {file && file[0] && (
                <Typography variant="caption" component="div">
                  {`Change to: ${file[0].name}`}
                </Typography>
              )}
            </>
          )}
          <input ref={hiddenFileInput} hidden accept="image/*" type="file" onChange={(e) => setFile(e.target.files)} />
        </Grid>

        <Grid item xs={8} ml={6} mb={6} className={classes.uploadText}>
          <Typography variant="subtitle1" component="div">
            Profile image
          </Typography>
          <Typography variant="caption" component="div">
            Use JPEG or PNG formats, a self image or a logo.
          </Typography>
          <Typography variant="caption" component="div">
            The image file shouldn’t be less than 4 mb.
          </Typography>
        </Grid>

        <Grid item xs={12} mb={5}>
          <Typography variant="body1" component="div">
            About Me
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={10}
            id="about_me"
            name="about_me"
            autoComplete="about_me"
            placeholder="A short info about yourself or the company you represent."
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleFinish} className={classes.finish}>
            Finish
          </Button>
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

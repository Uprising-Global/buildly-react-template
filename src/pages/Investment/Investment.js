import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Loader from '@components/Loader/Loader';
import { getAllFilms, getFilm } from '@redux/project/project.actions';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '6em',
    flex: 1,
  },
  noDetails: {
    textAlign: 'center',
    marginTop: theme.spacing(20),
  },
}));

const Investment = ({
  dispatch, loading, loaded, films, film_uuid, user,
}) => {
  const classes = useStyles();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    if (_.isEmpty(films)) {
      dispatch(getAllFilms());
    }
  }, []);

  useEffect(() => {
    if (films && !_.isEmpty(films)) {
      const found = _.find(films, { film_uuid });
      if (!found || _.isEmpty(found)) {
        dispatch(getFilm(film_uuid));
      } else {
        setFilm(found);
      }
    }
  }, [films, film_uuid]);

  return (
    <div className={classes.container}>
      {loading && <Loader open={loading} />}
      {loaded && !film && (
        <Typography variant="h5" component="h5" className={classes.noDetails}>
          Film details not found. Please reload the page to try again.
        </Typography>
      )}

      {loaded && film && (
        <Typography variant="body1" component="div">
          {film.name}
        </Typography>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  film_uuid: ownProps.match.params.film_uuid,
  loading: state.projectReducer.loading || state.authReducer.loading,
  loaded: state.projectReducer.loaded || state.authReducer.loaded,
  user: state.authReducer.data,
  films: state.projectReducer.films,
});

export default connect(mapStateToProps)(Investment);

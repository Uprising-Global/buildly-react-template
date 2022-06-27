import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  Button, Card, CardContent, CardMedia, InputAdornment, MenuItem, TextField, Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import makeStyles from '@mui/styles/makeStyles';
import Loader from '@components/Loader/Loader';
import { getAllFilms } from '@redux/project/project.actions';
import { routes } from '@routes/routesConstants';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8),
    paddingTop: '6em',
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
    flex: 1,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTop: `1px solid ${theme.palette.primary.contrastText}`,
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
  },
  searchInput: {
    margin: `${theme.spacing(2)} ${theme.spacing(10)}`,
    marginRight: 0,
    '& .MuiOutlinedInput-root': {
      color: theme.palette.primary.contrastText,
      backgroundColor: '#253238',
      borderRadius: theme.spacing(4),
      borderColor: '#999999',
    },
    '& .MuiSvgIcon-root': {
      color: '#90A4AF',
    },
  },
  filterContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridColumnGap: theme.spacing(8),
    marginTop: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
    '& .MuiOutlinedInput-root': {
      color: theme.palette.primary.contrastText,
      backgroundColor: '#253238',
      borderColor: '#999999',
    },
  },
  filterFields: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  fetchButton: {
    width: '100%',
    textAlign: 'center',
    marginTop: theme.spacing(11),
  },
  noFilms: {
    marginTop: theme.spacing(6),
    textAlign: 'center',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: theme.spacing(7),
    marginTop: theme.spacing(6),
  },
  card: {
    borderRadius: theme.spacing(1),
    textAlign: 'start',
    border: 'none',
    backgroundColor: '#253238',
  },
  cardActionArea: {
    padding: theme.spacing(2),
  },
  multiLineEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
  },
}));

const Projects = ({
  dispatch, loading, films, history,
}) => {
  const classes = useStyles();

  const [allFilms, setAllFilms] = useState(films);
  const [allGenre, setAllGenre] = useState([]);
  const [allCountryOfProd, setAllCountryOfProd] = useState([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('all');
  const [countryOfProd, setCountryOfProd] = useState('all');
  const [status, setStatus] = useState('all');
  const [sortBy, setSortBy] = useState('desc');
  const [filmList, setFilmList] = useState([]);
  const [showLimit, setShowLimit] = useState(5);
  const [showFilms, setShowFilms] = useState([]);

  useEffect(() => {
    dispatch(getAllFilms());
  }, []);

  useEffect(() => {
    if (!_.isEmpty(films)) {
      setAllFilms(films);
    }
  }, [films]);

  useEffect(() => {
    if (!_.isEmpty(allFilms)) {
      setAllGenre(_.uniq(_.flatMap(allFilms, 'genre')));
      setAllCountryOfProd(_.uniq(_.flatMap(allFilms, 'country_of_production')));
    }
  }, [allFilms]);

  useEffect(() => {
    setShowFilms(_.take(filmList, showLimit));
  }, [showLimit]);

  useEffect(() => {
    if (!_.isEmpty(allFilms)) {
      let filteredFilms = allFilms;
      if (genre !== 'all') {
        filteredFilms = _.filter(filteredFilms, (film) => (_.includes(film.genre, genre)));
      }
      if (countryOfProd !== 'all') {
        filteredFilms = _.filter(filteredFilms, (film) => (
          _.includes(film.country_of_production, countryOfProd)
        ));
      }
      if (status !== 'all') {
        filteredFilms = _.filter(filteredFilms, { status });
      }

      filteredFilms = _.orderBy(filteredFilms, 'create_date', sortBy);
      setFilmList(filteredFilms);
      setShowLimit(5);
      setShowFilms(_.take(filteredFilms, showLimit));
    }
  }, [allFilms, genre, countryOfProd, status, sortBy]);

  const handleSearch = () => {
    if (search) {
      setAllFilms(_.filter(filmList, (film) => _.includes(film.name, search)));
    } else {
      setAllFilms(films);
    }
  };

  return (
    <div className={classes.container}>
      {loading && <Loader open={loading} />}
      <div className={classes.titleContainer}>
        <Typography variant="h3" color="primary">
          Projects
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="search"
          type="text"
          id="search"
          className={classes.searchInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon color="inherit" />
              </InputAdornment>
            ),
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
      </div>

      <div className={classes.filterContainer}>
        <Typography variant="body1">
          Genre
        </Typography>

        <Typography variant="body1">
          Country of Production
        </Typography>

        <Typography variant="body1">
          Status
        </Typography>

        <Typography variant="body1">
          Sort by
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          select
          name="genre"
          type="text"
          id="genre"
          autoComplete="genre"
          className={classes.filterFields}
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <MenuItem value="all">All genres</MenuItem>
          {allGenre && !_.isEmpty(allGenre) && _.map(allGenre, (gen, idx) => (
            <MenuItem key={`${gen}-${idx}`} value={gen}>
              {gen}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          variant="outlined"
          margin="normal"
          select
          name="countryOfProd"
          type="text"
          id="countryOfProd"
          autoComplete="countryOfProd"
          className={classes.filterFields}
          value={countryOfProd}
          onChange={(e) => setCountryOfProd(e.target.value)}
        >
          <MenuItem value="all">All countries</MenuItem>
          {allCountryOfProd && !_.isEmpty(allCountryOfProd)
          && _.map(allCountryOfProd, (cop, idx) => (
            <MenuItem key={`${cop}-${idx}`} value={cop}>
              {cop}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          variant="outlined"
          margin="normal"
          select
          name="status"
          type="text"
          id="status"
          autoComplete="status"
          className={classes.filterFields}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="all">All statuses</MenuItem>
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </TextField>

        <TextField
          variant="outlined"
          margin="normal"
          select
          name="sortBy"
          type="text"
          id="sortBy"
          autoComplete="sortBy"
          className={classes.filterFields}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="desc">Newest first</MenuItem>
          <MenuItem value="asc">Oldest first</MenuItem>
        </TextField>
      </div>

      <div className={_.isEmpty(showFilms) ? classes.noFilms : classes.cardContainer}>
        {showFilms && _.isEmpty(showFilms) && (
          <Typography variant="h6">
            No projects yet on the platform.
          </Typography>
        )}

        {showFilms && !_.isEmpty(showFilms) && _.map(showFilms, (film, idx) => (
          <Card key={`${film.film_uuid}-${idx}`} variant="outlined" className={classes.card}>
            <CardMedia
              component="img"
              height="160"
              image={film.poster_url}
              alt={film.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h6">
                {film.name}
              </Typography>
              <Typography variant="body1" className={classes.multiLineEllipsis}>
                {film.description}
              </Typography>
            </CardContent>
            <div className={classes.cardActionArea}>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                fullWidth
                onClick={(e) => history.push(`${routes.FILM}/${film.film_uuid}`)}
              >
                Check this project
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {showFilms && !_.isEmpty(showFilms) && (showLimit < _.size(filmList)) && (
        <div className={classes.fetchButton}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={(e) => setShowLimit(showLimit + 5)}
          >
            Fetch more
          </Button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state.projectReducer,
});

export default connect(mapStateToProps)(Projects);

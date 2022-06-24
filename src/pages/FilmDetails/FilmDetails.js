import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  Box,
  Button, Grid, Tab, Typography,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import makeStyles from '@mui/styles/makeStyles';
import uprising from '@assets/uprising.png';
import Loader from '@components/Loader/Loader';
import { getAllFilms } from '@redux/project/project.actions';
import { Route } from 'react-router-dom';
import Overview from './components/Overview';
import CastCrew from './components/CastCrew';
import Updates from './components/Updates';
import Comments from './components/Comments';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '6em',
    flex: 1,
  },
  noDetails: {
    textAlign: 'center',
    marginTop: theme.spacing(20),
  },
  posterContainer: {
    display: 'grid',
    gridTemplateColumns: 'max-content auto max-content',
    gridColumnGap: theme.spacing(3),
    padding: `0 ${theme.spacing(1)}`,
  },
  leftImage: {
    transform: 'scaleX(-1) scaleY(-1)',
  },
  centerImage: {
    height: '100%',
    objectFit: 'contain',
    borderRadius: theme.spacing(2),
  },
  detailsContainer: {
    padding: `${theme.spacing(4)} ${theme.spacing(22.5)} ${theme.spacing(24)}`,
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
  },
  leftSection: {
    paddingRight: theme.spacing(13),
  },
  shareSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  shareIcon: {
    marginLeft: theme.spacing(2),
  },
  tabList: {
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
    '& .Mui-selected': {
      color: '#F58020',
    },
    '& .MuiTabs-indicator': {
      backgroundColor: 'transparent',
    },
    '& h6': {
      textTransform: 'uppercase',
    },
    '& button': {
      flex: 1,
    },
  },
  investSection: {
    paddingLeft: theme.spacing(4),
    borderLeft: `1px dashed ${theme.palette.secondary.main}`,
  },
  button: {
    marginTop: theme.spacing(5),
    textTransform: 'uppercase',
    borderRadius: theme.spacing(4),
  },
  caption: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    textAlign: 'center',
  },
  dealSection: {
    marginTop: theme.spacing(9),
    paddingLeft: theme.spacing(4),
  },
  bottomHighlight: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
    width: '45%',
    borderBottom: `1px dashed ${theme.palette.secondary.main}`,
  },
}));

const FilmDetails = ({
  dispatch, loading, loaded, films, film_uuid,
}) => {
  const classes = useStyles();
  const [film, setFilm] = useState(null);
  const [tabView, setTabView] = useState('overview');

  useEffect(() => {
    if (_.isEmpty(films)) {
      dispatch(getAllFilms());
    }
  }, []);

  useEffect(() => {
    if (films && !_.isEmpty(films)) {
      setFilm(_.find(films, { film_uuid }));
    }
  }, [films]);

  return (
    <div className={classes.container}>
      {loading && <Loader open={loading} />}

      {loaded && !film && (
        <Typography variant="h5" component="h5" className={classes.noDetails}>
          Film details not found. Please reload the page to try again.
        </Typography>
      )}

      {loaded && film && (
        <Grid container>
          <Grid container className={classes.posterContainer}>
            <Grid item>
              <img src={uprising} alt="Uprising" className={classes.leftImage} />
            </Grid>

            <Grid item>
              <img src={film.poster_url} alt={film.name} className={classes.centerImage} />
            </Grid>

            <Grid item>
              <img src={uprising} alt="Uprising" />
            </Grid>
          </Grid>

          <Grid container className={classes.detailsContainer}>
            <Grid item xs={9} className={classes.leftSection}>
              <Grid container>
                <Grid item xs={8}>
                  <Typography variant="h4" component="h4">
                    {film.name}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <div className={classes.shareSection}>
                    <Typography variant="body1" component="div">
                      Share:
                    </Typography>
                    <TwitterIcon className={classes.shareIcon} />
                    <FacebookIcon className={classes.shareIcon} />
                    <InstagramIcon className={classes.shareIcon} />
                    <LinkedInIcon className={classes.shareIcon} />
                  </div>
                </Grid>
              </Grid>

              <Grid item xs={12} mt={3}>
                <Typography variant="subtitle1" component="div">
                  {/* {film.description} */}
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less normal
                  distribution of letters, as opposed to using 'Content here, content
                  here', making it look like readable English. Many desktop publishing
                  packages and web page editors now use Lorem Ipsum as their default
                  model text, and a search for 'lorem ipsum' will uncover many web sites
                  still in their infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour and the like).
                </Typography>
              </Grid>

              <Grid item xs={12} mt={6}>
                <TabContext value={tabView}>
                  <TabList aria-label="film tabs" onChange={(e, newValue) => setTabView(newValue)} className={classes.tabList}>
                    <Tab
                      value="overview"
                      label={(
                        <Typography variant="h6" component="h6">
                          Overview
                        </Typography>
                      )}
                      style={{ paddingLeft: 0 }}
                    />
                    <Tab
                      value="cast-crew"
                      label={(
                        <Typography variant="h6" component="h6">
                          Cast/Crew
                        </Typography>
                      )}
                    />
                    <Tab
                      value="updates"
                      label={(
                        <Typography variant="h6" component="h6">
                          Updates
                        </Typography>
                      )}
                    />
                    <Tab
                      value="comments"
                      label={(
                        <Typography variant="h6" component="h6">
                          Comments
                        </Typography>
                      )}
                      style={{ paddingRight: 0 }}
                    />
                  </TabList>
                  <TabPanel value="overview">
                    <Overview />
                  </TabPanel>
                  <TabPanel value="cast-crew">
                    <CastCrew />
                  </TabPanel>
                  <TabPanel value="updates">
                    <Updates />
                  </TabPanel>
                  <TabPanel value="comments">
                    <Comments />
                  </TabPanel>
                </TabContext>
              </Grid>
            </Grid>

            <Grid item xs={3}>
              <Grid item xs={12} className={classes.investSection}>
                <Typography variant="body1" component="div">
                  Invest section will come here
                </Typography>

                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  fullWidth
                >
                  Invest
                </Button>

                <Typography variant="caption" component="div" className={classes.caption}>
                  $100 minimum investment
                </Typography>
              </Grid>

              <Grid item xs={12} className={classes.dealSection}>
                <Typography variant="h4" component="h4">
                  Deal Terms
                </Typography>
                <div className={classes.bottomHighlight} />

                <div>
                  Deal term details will come here
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state.projectReducer,
  film_uuid: ownProps.match.params.film_uuid,
});

export default connect(mapStateToProps)(FilmDetails);

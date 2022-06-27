import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment-timezone';
import {
  Grid, Tab, Typography,
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
import { getAllFilms, getFilm, getFilmDealTerm } from '@redux/project/project.actions';
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
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
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
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
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
    stroke: theme.palette.secondary.main,
    strokeWidth: theme.spacing(0.25),
  },
  dealDeatil: {
    marginTop: theme.spacing(2),
  },
}));

const FilmDetails = ({
  dispatch, loading, loaded, films, film_uuid, dealTerm,
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
      const found = _.find(films, { film_uuid });
      if (!found || _.isEmpty(found)) {
        dispatch(getFilm(film_uuid));
      } else {
        setFilm(found);
      }
    }

    if (!dealTerm) {
      dispatch(getFilmDealTerm(film_uuid));
    }
  }, [films, film_uuid]);

  const convertToDollar = (value) => `$${String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

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
              <div
                className={classes.centerImage}
                style={{ backgroundImage: `url(${film.poster_url})` }}
              >
                {!film.poster_url && film.name}
              </div>
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
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                      <TwitterIcon className={classes.shareIcon} />
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                      <FacebookIcon className={classes.shareIcon} />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                      <InstagramIcon className={classes.shareIcon} />
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                      <LinkedInIcon className={classes.shareIcon} />
                    </a>
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
                  <TabPanel value="overview" style={{ padding: 0 }}>
                    <Overview film={film} />
                  </TabPanel>
                  <TabPanel value="cast-crew" style={{ padding: 0 }}>
                    <CastCrew film_uuid={film_uuid} />
                  </TabPanel>
                  <TabPanel value="updates" style={{ padding: 0 }}>
                    <Updates film_uuid={film_uuid} />
                  </TabPanel>
                  <TabPanel value="comments" style={{ padding: 0 }}>
                    <Comments film_uuid={film_uuid} />
                  </TabPanel>
                </TabContext>
              </Grid>
            </Grid>

            <Grid item xs={3}>
              {/* <Grid item xs={12} className={classes.investSection}>
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
              </Grid> */}

              <Grid item xs={12} className={classes.dealSection}>
                <Typography variant="h4" component="h4">
                  Deal Terms
                </Typography>
                <svg width="40%" height="28" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <line strokeDasharray="15" x1="0" y1="10" x2="100%" y2="10" className={classes.bottomHighlight} />
                </svg>

                {dealTerm && dealTerm.production_budget && (
                  <div className={classes.dealDeatil}>
                    <Typography variant="subtitle1" component="div">
                      Production Budget
                    </Typography>
                    <Typography variant="subtitle1" component="div" color="#F58020">
                      {convertToDollar(dealTerm.production_budget)}
                    </Typography>
                  </div>
                )}

                {dealTerm && dealTerm.greenlight_goal && (
                  <div className={classes.dealDeatil}>
                    <Typography variant="subtitle1" component="div">
                      Greenlight Goal
                    </Typography>
                    <Typography variant="subtitle1" component="div" color="#F58020">
                      {convertToDollar(dealTerm.greenlight_goal)}
                    </Typography>
                  </div>
                )}

                {dealTerm && dealTerm.maximum_raise && (
                  <div className={classes.dealDeatil}>
                    <Typography variant="subtitle1" component="div">
                      Maximum Raise
                    </Typography>
                    <Typography variant="subtitle1" component="div" color="#F58020">
                      {convertToDollar(dealTerm.maximum_raise)}
                    </Typography>
                  </div>
                )}

                {dealTerm && dealTerm.investor_equity_pool && (
                  <div className={classes.dealDeatil}>
                    <Typography variant="subtitle1" component="div">
                      Investor Equity Pool
                    </Typography>
                    <Typography variant="subtitle1" component="div" color="#F58020">
                      {`${dealTerm.investor_equity_pool}%`}
                    </Typography>
                  </div>
                )}

                {dealTerm && dealTerm.minimum_investment && (
                  <div className={classes.dealDeatil}>
                    <Typography variant="subtitle1" component="div">
                      Minimum Investment
                    </Typography>
                    <Typography variant="subtitle1" component="div" color="#F58020">
                      {convertToDollar(dealTerm.minimum_investment)}
                    </Typography>
                  </div>
                )}

                {dealTerm && dealTerm.maximum_investment && (
                  <div className={classes.dealDeatil}>
                    <Typography variant="subtitle1" component="div">
                      Maximum Investment
                    </Typography>
                    <Typography variant="subtitle1" component="div" color="#F58020">
                      {convertToDollar(dealTerm.maximum_investment)}
                    </Typography>
                  </div>
                )}

                {dealTerm && dealTerm.deadline_date && (
                  <div className={classes.dealDeatil}>
                    <Typography variant="subtitle1" component="div">
                      Deadline
                    </Typography>
                    <Typography variant="subtitle1" component="div" color="#F58020">
                      {moment(dealTerm.deadline_date).format('MMMM DD, YYYY')}
                    </Typography>
                  </div>
                )}
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

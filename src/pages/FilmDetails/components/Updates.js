import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import moment from 'moment-timezone';
import _ from 'lodash';
import makeStyles from '@mui/styles/makeStyles';
import {
  Avatar,
  Card, CardContent, CardMedia, Grid, Typography,
} from '@mui/material';
import { FavoriteBorder, Forum } from '@mui/icons-material';
import { loadCoreuserData } from '@redux/coreuser/coreuser.actions';
import { connect } from 'react-redux';
import Loader from '@components/Loader/Loader';
import { httpService } from '@modules/http/http.service';
import { routes } from '@routes/routesConstants';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
  },
  card: {
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  cardContent: {
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(7),
  },
  textContainer: {
    marginTop: theme.spacing(0.5),
    height: theme.spacing(10),
    overflow: 'hidden',
  },
  cardBottom: {
    paddingTop: theme.spacing(3),
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    '& div': {
      marginRight: theme.spacing(1),
    },
  },
  likeComments: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    color: theme.palette.secondary.main,
    '& svg': {
      marginLeft: theme.spacing(3),
    },
    '& div': {
      marginLeft: theme.spacing(1),
    },
  },
  separator: {
    stroke: theme.palette.secondary.main,
    strokeWidth: theme.spacing(0.25),
  },
  readMore: {
    float: 'right',
    color: '#478ECC',
  },
}));

const Updates = ({
  startDate, filmUpdates, dispatch, loading, loaded, allUsers,
}) => {
  const classes = useStyles();
  const [allUpdates, setAllUpdates] = useState([]);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    dispatch(loadCoreuserData());
  }, []);

  useEffect(() => {
    if (allUsers && !_.isEmpty(allUsers)) {
      processUpdates();
    }
  }, [filmUpdates, allUsers]);

  const processUpdates = async () => {
    const updates = await Promise.all(_.map(filmUpdates, async (update) => {
      let updt = update;
      const userData = _.find(allUsers, { core_user_uuid: update.user_uuid });

      if (userData) {
        updt = {
          ...updt,
          owner: {
            name: `${userData.first_name} ${userData.last_name}`,
            image: userData.avatar,
          },
        };
      }

      const count = await httpService.makeRequest('get', `${window.env.COMMENT_COUNT_URL}${updt.update_uuid}`);
      if (count.data && _.isNumber(count.data)) {
        updt = { ...updt, commentCount: count.data };
      } else {
        updt = { ...updt, commentCount: 0 };
      }

      return updt;
    }));

    setAllUpdates(updates);
    setProcessing(false);
  };

  return (
    <div className={classes.container}>
      {(loading || processing) && <Loader open={loading} />}

      {(loaded || !processing) && allUpdates && !_.isEmpty(allUpdates)
      && _.map(allUpdates, (filmUpdate, idx) => (
        <React.Fragment key={filmUpdate.update_uuid}>
          <Card variant="outlined" className={classes.card}>
            <CardMedia
              component="img"
              height="240"
              image={filmUpdate.poster_url}
              alt={filmUpdate.name}
            />

            <CardContent className={classes.cardContent}>
              <Typography variant="h2" component="h2">
                {filmUpdate.name}
              </Typography>

              <Typography variant="body1" component="div" color="secondary">
                {moment(filmUpdate.create_date).format('MMMM DD, YYYY')}
              </Typography>

              <div className={classes.textContainer}>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {filmUpdate.description}
                </ReactMarkdown>
              </div>

              <Link
                to={{
                  pathname: `${routes.FILM_UPDATE}/${filmUpdate.update_uuid}`,
                  state: { film_uuid: filmUpdate.film_uuid },
                }}
                className={classes.readMore}
              >
                ...Read more
              </Link>

              <Grid container className={classes.cardBottom}>
                <Grid item xs={4}>
                  {filmUpdate && filmUpdate.owner && (
                    <div className={classes.avatar}>
                      <Avatar variant="rounded" alt={filmUpdate.owner.name} src={filmUpdate.owner.avatar} />
                      <Typography variant="subtitle1" component="div">
                        {filmUpdate.owner.name}
                      </Typography>
                    </div>
                  )}
                </Grid>

                <Grid item xs={8} className={classes.likeComments}>
                  <FavoriteBorder fontSize="small" />
                  <Typography variant="subtitle1" component="div">
                    {`${_.size(filmUpdate.update_likes)} ${_.size(filmUpdate.update_likes) > 1 ? 'Likes' : 'Like'}`}
                  </Typography>

                  <Forum fontSize="small" htmlColor="#F58020" />
                  <Typography variant="subtitle1" component="div" color="#F58020">
                    {`${filmUpdate.commentCount} ${filmUpdate.commentCount > 1 ? 'Comments' : 'Comment'}`}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <svg width="100%" height="130" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <line strokeDasharray="12" x1="50%" y1="10" x2="50%" y2="120" className={classes.separator} />
          </svg>
        </React.Fragment>
      ))}

      <div style={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h4" color="secondary">
          {moment(startDate).format('MMMM DD, YYYY')}
        </Typography>

        <Typography variant="h4" component="h4">
          The Fundraising Has Begun!
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  loading: state.coreuserReducer.loading || state.authReducer.loading,
  loaded: state.coreuserReducer.loaded || state.authReducer.loaded,
  allUsers: state.coreuserReducer.data,
});

export default connect(mapStateToProps)(Updates);

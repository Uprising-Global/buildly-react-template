import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import moment from 'moment-timezone';
import _ from 'lodash';
import {
  Avatar, Button, Dialog, Grid, IconButton, TextField, Typography,
} from '@mui/material';
import {
  Close, Favorite, FavoriteBorder, Forum,
} from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';
import Comment from '@components/Comment/Comment';
import Loader from '@components/Loader/Loader';
import { loadCoreuserData } from '@redux/coreuser/coreuser.actions';
import { editUpdate, getFilmUpdates } from '@redux/project/project.actions';
import { allComments, clearComments, newComment, updateComment } from '@redux/comments/comments.actions';

const useStyles = makeStyles((theme) => ({
  close: {
    width: 'max-content',
    alignSelf: 'end',
  },
  noUpdate: {
    margin: 'auto',
  },
  container: {
    height: '100%',
    padding: theme.spacing(4),
    paddingRight: theme.spacing(20),
    paddingLeft: theme.spacing(12),
    overflow: 'scroll',
    display: 'grid',
    gridTemplateColumns: '1fr 7fr',
    gridColumnGap: theme.spacing(2),
  },
  date: {
    textAlign: 'end',
    paddingTop: theme.spacing(5),
  },
  update: {
    padding: theme.spacing(5),
    border: `1px solid ${theme.palette.primary.contrastText}`,
    borderRadius: theme.spacing(1.5),
  },
  title: {
    paddingBottom: theme.spacing(3),
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    '& div': {
      marginRight: theme.spacing(1),
    },
    paddingBottom: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
  },
  likeComment: {
    paddingTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: theme.spacing(0.5),
      color: theme.palette.secondary.main,
      '&:nth-of-type(2)': {
        color: theme.palette.primary.main,
      },
    },
    '& div': {
      marginRight: theme.spacing(4),
      '&:last-of-type': {
        flex: 1,
        color: theme.palette.primary.main,
      },
    },
  },
  noUser: {
    paddingTop: theme.spacing(1),
    textAlign: 'end',
  },
  commentContainer: {
    paddingTop: theme.spacing(2),
  },
  commentAvatar: {
    marginTop: theme.spacing(2),
  },
  commentInput: {
    backgroundColor: 'transparent',
    color: 'inherit',
    border: `1px solid ${theme.palette.primary.contrastText}`,
  },
  postButton: {
    margin: `${theme.spacing(2)} 0 0 auto`,
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    '&.Mui-disabled': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      opacity: 0.5,
    },
  },
  goBack: {
    margin: `${theme.spacing(5)} 45%`,
  },
}));

const UpdateDetails = ({
  history, location, dispatch, loading, update_uuid, filmUpdates, allUsers, user, comments,
}) => {
  const classes = useStyles();
  const commentSocket = useRef(null);
  const [update, setUpdate] = useState(filmUpdates && _.find(filmUpdates, { update_uuid }));
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!update) {
      dispatch(getFilmUpdates(location.state.film_uuid));
    }
  }, []);

  useEffect(() => {
    let updt = null;
    if (filmUpdates && !_.isEmpty(filmUpdates)) {
      updt = _.find(filmUpdates, { update_uuid });
    }

    if (!allUsers || _.isEmpty(allUsers)) {
      dispatch(loadCoreuserData());
    }

    if (allUsers && !_.isEmpty(allUsers)) {
      const updateOwner = _.find(allUsers, { core_user_uuid: updt.user_uuid });
      if (!updateOwner) {
        dispatch(loadCoreuserData());
      } else {
        updt = { ...updt, owner: { name: `${updateOwner.first_name} ${updateOwner.last_name}`, avatar: updateOwner.avatar } };
      }
    }

    setUpdate(updt);
  }, [filmUpdates, allUsers]);

  useEffect(() => {
    if (update_uuid) {
      commentSocket.current = new WebSocket(`${window.env.COMMENT_SOCKET_URL}${update_uuid}/`);

      commentSocket.current.onopen = () => {
        commentSocket.current.send(
          JSON.stringify({ command: 'fetch_comments', group_uuid: update_uuid }),
        );
      };

      commentSocket.current.onerror = (error) => {
        console.error(error);
      };

      commentSocket.current.onclose = () => {
        console.log('Comment Socket closed');
      };

      commentSocket.current.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.command === 'fetch_comments') {
          dispatch(allComments(data.comments));
        }

        if (data.command === 'new_comment') {
          dispatch(newComment(data.comment));
        }

        if (data.command === 'update_comment') {
          dispatch(updateComment(data.comment));
        }
      };
    }

    return () => {
      if (commentSocket.current) {
        dispatch(clearComments());
        commentSocket.current.close();
      }
    };
  }, [update_uuid]);

  const likeUpdate = (type) => {
    const formData = new FormData();
    let updateLikes = update.update_likes;

    switch (true) {
      case type === 'add':
        updateLikes = [...updateLikes, user.core_user_uuid];
        break;

      case type === 'remove':
        updateLikes = _.without(updateLikes, user.core_user_uuid);
        break;

      default:
        break;
    }

    formData.append('update_likes', JSON.stringify(updateLikes));
    dispatch(editUpdate(update.update_uuid, formData));
  };

  const postComment = (e) => {
    commentSocket.current.send(
      JSON.stringify({
        command: 'new_comment',
        group_uuid: update_uuid,
        author: user.core_user_uuid,
        comment_message: message,
        likes: [],
      }),
    );
    setMessage('');
  };

  return (
    <div>
      {loading && <Loader open={loading} />}
      <Dialog open onClose={history.goBack} fullScreen>
        <IconButton
          color="inherit"
          onClick={history.goBack}
          aria-label="close"
          className={classes.close}
        >
          <Close />
        </IconButton>

        {!update && (
          <Typography variant="h5" component="h5" className={classes.noUpdate}>
            Film update details not found. Please reload.
          </Typography>
        )}

        {update && (
          <div className={classes.container}>
            <div className={classes.date}>
              <Typography variant="h4" component="h4">
                {moment(update.create_date).format('MMMM DD')}
              </Typography>
              <Typography variant="body1" component="div">
                {moment(update.create_date).format('YYYY')}
              </Typography>
            </div>

            <div>
              <div className={classes.update}>
                <Typography variant="h4" component="h4" className={classes.title}>
                  {update.name}
                </Typography>

                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {update.description}
                </ReactMarkdown>

                {update.owner && (
                  <div className={classes.avatar}>
                    <Avatar variant="rounded" alt={update.owner.name} src={update.owner.avatar} />
                    <Typography variant="subtitle1" component="div">
                      {update.owner.name}
                    </Typography>
                  </div>
                )}

                <div className={classes.likeComment}>
                  <FavoriteBorder fontSize="small" />
                  <Typography variant="subtitle1" component="div" color="secondary">
                    {`Like (${_.size(update.update_likes)})`}
                  </Typography>

                  <Forum fontSize="small" />
                  <Typography variant="subtitle1" component="div" color="primary">
                    {`Comment (${_.size(comments)})`}
                  </Typography>

                  {user && _.includes(update.update_likes, user.core_user_uuid)
                    ? (
                      <IconButton onClick={(e) => likeUpdate('remove')}>
                        <Favorite fontSize="small" />
                      </IconButton>
                    )
                    : (
                      <IconButton onClick={(e) => likeUpdate('add')}>
                        <FavoriteBorder fontSize="small" />
                      </IconButton>
                    )}
                </div>
              </div>

              {!user && (
                <Typography variant="subtitle1" component="div" className={classes.noUser}>
                  Please sign in to either like or comment.
                </Typography>
              )}

              {user && (
                <Grid container className={classes.commentContainer}>
                  <Grid item xs={0.8} className={classes.commentAvatar}>
                    <Avatar variant="rounded" alt={`${user.first_name} ${user.last_name}`} src={user.avatar} />
                  </Grid>

                  <Grid item xs={11.2}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      multiline
                      id="message"
                      placeholder="Post a new question or comment"
                      name="message"
                      autoComplete="message"
                      InputProps={{
                        className: classes.commentInput,
                      }}
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Grid>

                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    disabled={!message}
                    className={classes.postButton}
                    onClick={postComment}
                  >
                    Post
                  </Button>
                </Grid>
              )}

              <Comment
                commentSocket={commentSocket}
                group_uuid={update_uuid}
              />

              <Button variant="contained" type="button" onClick={history.goBack} className={classes.goBack}>
                Go Back
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state.projectReducer,
  ...state.commentsReducer,
  update_uuid: ownProps.match.params.update_uuid,
  loading: state.projectReducer.loading || state.coreuserReducer.loading,
  allUsers: state.coreuserReducer.data,
  user: state.authReducer.data,
});

export default connect(mapStateToProps)(UpdateDetails);

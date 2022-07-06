import React, { useState } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import {
  Avatar, Button, Grid, IconButton, TextField, Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Edit, Favorite, FavoriteBorder } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    border: `1px solid ${theme.palette.primary.contrastText}`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
  },
  avatar: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(2),
  },
  message: {
    marginTop: theme.spacing(2),
  },
  likeComment: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  like: {
    color: theme.palette.secondary.main,
  },
  reply: {
    color: theme.palette.primary.main,
    '&.MuiIconButton-root': {
      marginLeft: theme.spacing(4),
    },
  },
  noUser: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(1),
  },
  noComments: {
    margin: `${theme.spacing(10)} auto`,
    textAlign: 'center',
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
  replyContainer: {
    marginTop: 0,
    borderLeftWidth: '4px',
    borderLeftColor: theme.palette.primary.main,
    borderRadius: 0,
  },
  replyTitle: {
    paddingTop: theme.spacing(0.5),
    '& span': {
      paddingLeft: theme.spacing(1),
    },
  },
  replyMessage: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(5),
  },
  replyLikeComment: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(4.3),
    display: 'flex',
    alignItems: 'center',
  },
}));

const Comment = ({
  commentSocket, comments, user, allUsers,
}) => {
  const classes = useStyles();
  const [showInput, setShowInput] = useState('');
  const [message, setMessage] = useState('');

  const likeComment = (type, comment) => {
    let commentLikes = comment.likes;
    switch (true) {
      case type === 'add':
        commentLikes = [...commentLikes, user.core_user_uuid];
        break;

      case type === 'remove':
        commentLikes = _.without(commentLikes, user.core_user_uuid);
        break;

      default:
        break;
    }

    commentSocket.current.send(JSON.stringify({
      command: 'update_comment',
      ...comment,
      likes: commentLikes,
    }));
  };

  const postComment = (comment_uuid) => {
    commentSocket.current.send(
      JSON.stringify({
        command: 'new_comment',
        group_uuid: comment_uuid,
        author: user.core_user_uuid,
        comment_message: message,
        likes: [],
      }),
    );
    setShowInput('');
    setMessage('');
  };

  return (
    <>
      {comments && !_.isEmpty(comments)
      && allUsers && !_.isEmpty(allUsers)
      && _.map(comments, (comment, idx) => {
        const commentAuthor = _.find(allUsers, { core_user_uuid: comment.author });

        return (
          <React.Fragment key={`${comment.comment_uuid}-${idx}`}>
            <Grid container className={classes.container}>
              <Grid item className={classes.avatar}>
                <Avatar
                  variant="rounded"
                  alt={`${commentAuthor?.first_name} ${commentAuthor?.last_name}`}
                  src={commentAuthor.avatar}
                  sx={{ width: 48, height: 48 }}
                />
              </Grid>

              <Grid item>
                <Typography variant="h6" component="h6">
                  {`${commentAuthor?.first_name} ${commentAuthor?.last_name}`}
                </Typography>
                <Typography variant="caption" component="div">
                  {moment(comment.create_date).fromNow()}
                </Typography>
              </Grid>

              <Grid item xs={12} className={classes.message}>
                {comment.comment_message}
              </Grid>

              <Grid item xs={12} className={classes.likeComment}>
                {user && _.includes(comment.likes, user.core_user_uuid) && (
                  <IconButton onClick={(e) => likeComment('remove', comment)} className={classes.like}>
                    <Favorite fontSize="small" />
                  </IconButton>
                )}
                {user && !_.includes(comment.likes, user.core_user_uuid) && (
                  <IconButton onClick={(e) => likeComment('add', comment)} className={classes.like}>
                    <FavoriteBorder fontSize="small" />
                  </IconButton>
                )}
                {!user && <FavoriteBorder fontSize="small" className={classes.noUser} />}
                <Typography variant="body1" component="div" className={classes.like}>
                  {`${_.size(comment.likes)} ${_.size(comment.likes) > 1 ? 'likes' : 'like'}`}
                </Typography>

                {user && (
                  <>
                    <IconButton className={classes.reply} onClick={(e) => setShowInput(comment.comment_uuid)}>
                      <Edit />
                    </IconButton>
                    <Typography variant="body1" component="div" className={classes.reply}>
                      Reply
                    </Typography>
                  </>
                )}
              </Grid>
            </Grid>

            {comment && comment.replies && !_.isEmpty(comment.replies) && _.map(comment.replies, (reply, index) => {
              const replyAuthor = _.find(allUsers, { core_user_uuid: reply.author });

              return (
                <Grid
                  container
                  className={`${classes.container} ${classes.replyContainer}`}
                  key={`${reply.comment_uuid}-${index}`}
                >
                  <Grid item className={classes.avatar}>
                    <Avatar
                      variant="rounded"
                      alt={`${replyAuthor?.first_name} ${replyAuthor?.last_name}`}
                      src={replyAuthor.avatar}
                      sx={{ width: 24, height: 24 }}
                    />
                  </Grid>
  
                  <Grid item>
                    <Typography variant="h6" component="h6" className={classes.replyTitle}>
                      {`${replyAuthor?.first_name} ${replyAuthor?.last_name}`}
                      <Typography variant="caption" component="span">
                        {`(${moment(reply.create_date).fromNow()})`}
                      </Typography>
                    </Typography>
                  </Grid>
  
                  <Grid item xs={12} className={classes.replyMessage}>
                    {reply.comment_message}
                  </Grid>
  
                  <Grid item xs={12} className={classes.replyLikeComment}>
                    {user && _.includes(reply.likes, user.core_user_uuid) && (
                      <IconButton onClick={(e) => likeComment('remove', reply)} className={classes.like}>
                        <Favorite fontSize="small" />
                      </IconButton>
                    )}
                    {user && !_.includes(reply.likes, user.core_user_uuid) && (
                      <IconButton onClick={(e) => likeComment('add', reply)} className={classes.like}>
                        <FavoriteBorder fontSize="small" />
                      </IconButton>
                    )}
                    {!user && <FavoriteBorder fontSize="small" className={classes.noUser} />}
                    <Typography variant="body1" component="div" className={classes.like}>
                      {`${_.size(reply.likes)} ${_.size(reply.likes) > 1 ? 'likes' : 'like'}`}
                    </Typography>
  
                    {user && (
                      <>
                        <IconButton className={classes.reply} onClick={(e) => setShowInput(reply.comment_uuid)}>
                          <Edit />
                        </IconButton>
                        <Typography variant="body1" component="div" className={classes.reply}>
                          Reply
                        </Typography>
                      </>
                    )}
                  </Grid>
                </Grid>
              );
            })}

            {user && showInput
            && _.includes([comment.comment_uuid, ..._.map(comment.replies, 'comment_uuid')], showInput)
            && (
              <Grid container className={classes.commentContainer}>
                <Grid item xs={1} className={classes.commentAvatar}>
                  <Avatar variant="rounded" alt={`${user.first_name} ${user.last_name}`} src={user.avatar} />
                </Grid>
      
                <Grid item xs={11}>
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
                  onClick={(e) => postComment(showInput)}
                >
                  Post
                </Button>
              </Grid>
            )}
          </React.Fragment>
        );
      })}

      {(!comments || _.isEmpty(comments)) && (
        <Typography variant="h5" component="h5" className={classes.noComments}>
          No comments yet.
        </Typography>
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state.commentsReducer,
  user: state.authReducer.data,
  allUsers: state.coreuserReducer.data,
});

export default connect(mapStateToProps)(Comment);

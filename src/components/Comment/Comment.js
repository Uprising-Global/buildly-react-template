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
}));

const Comment = ({
  commentSocket, group_uuid, comments, user, allUsers,
}) => {
  const classes = useStyles();
  const [message, setMessage] = useState('');

  const likeComment = (type, comment, grp_uuid) => {
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
      group_uuid: grp_uuid,
      likes: commentLikes,
    }));
  };

  return (
    <>
      {comments && !_.isEmpty(comments)
      && allUsers && !_.isEmpty(allUsers)
      && _.map(comments, (comment, idx) => {
        const commentAuthor = _.find(allUsers, { core_user_uuid: comment.author });

        return (
          <Grid container className={classes.container} key={`${comment.id}-${idx}`}>
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
                <IconButton onClick={(e) => likeComment('remove', comment, group_uuid)} className={classes.like}>
                  <Favorite fontSize="small" />
                </IconButton>
              )}
              {user && !_.includes(comment.likes, user.core_user_uuid) && (
                <IconButton onClick={(e) => likeComment('add', comment, group_uuid)} className={classes.like}>
                  <FavoriteBorder fontSize="small" />
                </IconButton>
              )}
              {!user && <FavoriteBorder fontSize="small" className={classes.noUser} />}
              <Typography variant="body1" component="div" className={classes.like}>
                {`${_.size(comment.likes)} ${_.size(comment.likes) > 1 ? 'likes' : 'like'}`}
              </Typography>

              {user && (
                <>
                  <IconButton className={classes.reply}>
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

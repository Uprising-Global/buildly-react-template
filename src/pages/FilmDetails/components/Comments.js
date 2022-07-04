import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  Avatar, Button, Grid, TextField,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Comment from '@components/Comment/Comment';
import {
  allComments, clearComments, newComment, updateComment,
} from '@redux/comments/comments.actions';
import { loadCoreuserData } from '@redux/coreuser/coreuser.actions';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    paddingTop: theme.spacing(4),
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
}));

const Comments = ({
  film_uuid, user, dispatch, allUsers,
}) => {
  const classes = useStyles();
  const commentSocket = useRef(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!allUsers || _.isEmpty(allUsers)) {
      dispatch(loadCoreuserData());
    }
  }, []);

  useEffect(() => {
    if (film_uuid) {
      commentSocket.current = new WebSocket(`${window.env.COMMENT_SOCKET_URL}${film_uuid}/`);

      commentSocket.current.onopen = () => {
        commentSocket.current.send(
          JSON.stringify({ command: 'fetch_comments', group_uuid: film_uuid }),
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
  }, [film_uuid]);

  const postComment = (e) => {
    commentSocket.current.send(
      JSON.stringify({
        command: 'new_comment',
        group_uuid: film_uuid,
        author: user.core_user_uuid,
        comment_message: message,
        likes: [],
      }),
    );
    setMessage('');
  };

  return (
    <Grid container className={classes.container}>
      {user && (
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
            onClick={postComment}
          >
            Post
          </Button>
        </Grid>
      )}

      <Comment
        commentSocket={commentSocket}
        group_uuid={film_uuid}
      />
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  user: state.authReducer.data,
  allUsers: state.coreuserReducer.data,
});

export default connect(mapStateToProps)(Comments);

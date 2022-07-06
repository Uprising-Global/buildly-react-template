import _ from 'lodash';
import {
  ALL_COMMENTS,
  CLEAR_COMMENTS,
  NEW_COMMENT,
  UPDATE_COMMENT,
} from '@redux/comments/comments.actions';

const initialState = {
  comments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_COMMENTS:
      return initialState;

    case ALL_COMMENTS:
      return { ...state, comments: action.comments };

    case NEW_COMMENT: {
      const newGroupComment = !_.isEmpty(state.comments) && (
        state.comments[0].group_uuid === action.comment.group_uuid
      );
      let newComments = [];

      if (newGroupComment) {
        newComments = [...state.comments, action.comment];
      } else {
        newComments = _.map(state.comments, (comment) => (
          comment && comment.comment_uuid === action.comment.group_uuid
            ? { ...comment, replies: [...comment.replies, action.comment] }
            : comment
        ));
      }

      return { ...state, comments: _.orderBy(newComments, 'create_date', 'desc') };
    }

    case UPDATE_COMMENT: {
      const groupComment = _.find(state.comments, { id: action.comment.id });
      let updatedComments = [];

      if (groupComment) {
        updatedComments = _.map(state.comments, (comment) => (
          comment.id === action.comment.id
            ? action.comment
            : comment
        ));
      } else {
        updatedComments = _.map(state.comments, (comment) => {
          let returnComment = comment;
          if (comment.comment_uuid === action.comment.group_uuid) {
            returnComment = {
              ...returnComment,
              replies: _.map(comment.replies, (reply) => (
                reply.id === action.comment.id
                  ? action.comment
                  : reply
              )),
            };
          }

          return returnComment;
        });
      }

      return { ...state, comments: _.orderBy(updatedComments, 'create_date', 'desc') };
    }

    default:
      return state;
  }
};

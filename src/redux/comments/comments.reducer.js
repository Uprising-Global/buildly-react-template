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

    case NEW_COMMENT:
      return { ...state, comments: _.orderBy([...state.comments, action.comment], 'create_date', 'desc') };

    case UPDATE_COMMENT: {
      const updatedComments = _.map(state.comments, (comment) => (
        comment.id === action.comment.id
          ? action.comment
          : comment
      ));
      return { ...state, comments: _.orderBy(updatedComments, 'create_date', 'desc') };
    }

    default:
      return state;
  }
};

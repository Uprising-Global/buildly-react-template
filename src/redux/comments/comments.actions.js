// Comment action types
export const CLEAR_COMMENTS = 'COMMENTS/CLEAR_COMMENTS';
export const ALL_COMMENTS = 'COMMENTS/ALL_COMMENTS';
export const NEW_COMMENT = 'COMMENTS/NEW_COMMENT';
export const UPDATE_COMMENT = 'COMMENTS/UPDATE_COMMENT';

/**
 * Clear comments action
 */
export const clearComments = () => ({ type: CLEAR_COMMENTS });

/**
 * All comments action
 * @param comments
 */
export const allComments = (comments) => ({
  type: ALL_COMMENTS,
  comments,
});

/**
 * New comment action
 * @param comment
 */
export const newComment = (comment) => ({
  type: NEW_COMMENT,
  comment,
});

/**
 * Update comment action
 * @param comment
 */
export const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment,
});

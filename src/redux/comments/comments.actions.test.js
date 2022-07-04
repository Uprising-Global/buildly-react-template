import * as actions from '@redux/comments/comments.actions';

describe('actions', () => {
  it('should create an action for Clear Comments', () => {
    const expectedAction = { type: actions.CLEAR_COMMENTS };
    expect(actions.clearComments()).toEqual(expectedAction);
  });

  it('should create an action for All Comments', () => {
    const comments = [{ comment_message: 'Test 1' }];
    const expectedAction = {
      type: actions.ALL_COMMENTS,
      comments,
    };
    expect(actions.allComments(comments)).toEqual(expectedAction);
  });

  it('should create an action for New Comment', () => {
    const comment = [{ comment_message: 'New comment' }];
    const expectedAction = {
      type: actions.NEW_COMMENT,
      comment,
    };
    expect(actions.newComment(comment)).toEqual(expectedAction);
  });

  it('should create an action for Update Comment', () => {
    const comment = [{ comment_message: 'Update comment' }];
    const expectedAction = {
      type: actions.UPDATE_COMMENT,
      comment,
    };
    expect(actions.updateComment(comment)).toEqual(expectedAction);
  });
});

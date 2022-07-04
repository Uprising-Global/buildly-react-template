import * as actions from '@redux/comments/comments.actions';
import * as reducer from '@redux/comments/comments.reducer';

const initialState = {
  comments: [],
};

describe('Comment reducer', () => {
  it('should return empty list of comments', () => {
    expect(
      reducer.default({ comments: [{ comment_message: 'Message 1' }] }, { type: actions.CLEAR_COMMENTS }),
    ).toEqual(initialState);
  });

  it('should return list of comments', () => {
    const comments = [{ comment_message: 'Message 1' }, { comment_message: 'Message 2' }];
    expect(
      reducer.default(initialState, { type: actions.ALL_COMMENTS, comments }),
    ).toEqual({ comments });
  });

  it('should return list of comments with new comment in it', () => {
    const comment = { comment_message: 'Message 3' };
    expect(
      reducer.default(
        { comments: [{ comment_message: 'Message 1' }, { comment_message: 'Message 2' }] },
        { type: actions.NEW_COMMENT, comment },
      ),
    ).toEqual({
      comments: [
        { comment_message: 'Message 1' },
        { comment_message: 'Message 2' },
        { comment_message: 'Message 3' },
      ],
    });
  });

  it('should return updated list of comments', () => {
    const comments = [{ id: 1, comment_message: 'Message 1' }, { id: 2, comment_message: 'Message 2' }];
    const comment = { id: 2, comment_message: 'Updated message 2' };
    expect(
      reducer.default(
        { comments },
        { type: actions.UPDATE_COMMENT, comment },
      ),
    ).toEqual({
      comments: [
        { id: 1, comment_message: 'Message 1' },
        { id: 2, comment_message: 'Updated message 2' },
      ],
    });
  });
});

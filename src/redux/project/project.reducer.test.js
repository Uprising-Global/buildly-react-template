import * as actions from './project.actions';
import * as reducer from './project.reducer';

const initialState = {
  loading: false,
  loaded: false,
  films: [],
  filmUpdates: [],
  filmComments: [],
  error: null,
};

describe('Get all films reducer', () => {
  it('Empty reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.GET_ALL_FILMS },
    )).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('get all films success reducer', () => {
    const data = [{
      film_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      name: 'test film',
    }];

    expect(reducer.default(
      initialState,
      { type: actions.GET_ALL_FILMS_SUCCESS, data },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      films: data,
    });
  });

  it('get all films fail reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.GET_ALL_FILMS_FAIL },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      error: undefined,
    });
  });
});

describe('Get a film reducer', () => {
  it('Empty reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.GET_FILM },
    )).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('get a film success reducer', () => {
    const data = {
      film_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      name: 'test film',
    };

    expect(reducer.default(
      initialState,
      { type: actions.GET_FILM_SUCCESS, data },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      films: [data],
    });
  });

  it('get a film fail reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.GET_FILM_FAIL },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      error: undefined,
    });
  });
});

describe('Add a film reducer', () => {
  it('Empty reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.ADD_FILM },
    )).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('add a film success reducer', () => {
    const data = {
      film_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      name: 'test film',
    };

    expect(reducer.default(
      initialState,
      { type: actions.ADD_FILM_SUCCESS, data },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      films: [data],
    });
  });

  it('add a film fail reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.ADD_FILM_FAIL },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      error: undefined,
    });
  });
});

describe('Update a film reducer', () => {
  it('Empty reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.UPDATE_FILM },
    )).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('update a film success reducer', () => {
    const data = {
      film_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      name: 'test film',
    };
    const editedData = {
      film_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      name: 'updated test film',
    };

    expect(reducer.default(
      { ...initialState, films: [data] },
      { type: actions.UPDATE_FILM_SUCCESS, data: editedData },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      films: [editedData],
    });
  });

  it('update a film fail reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.UPDATE_FILM_FAIL },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      error: undefined,
    });
  });
});

describe('Delete a film reducer', () => {
  it('Empty reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.DELETE_FILM },
    )).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('delete a film success reducer', () => {
    const data = {
      film_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      name: 'test film',
    };

    expect(reducer.default(
      { ...initialState, films: [data] },
      {
        type: actions.DELETE_FILM_SUCCESS,
        film_uuid: data.film_uuid,
      },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      films: [],
    });
  });

  it('delete a film fail reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.DELETE_FILM_FAIL },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      error: undefined,
    });
  });
});

describe('Get all film updates reducer', () => {
  it('Empty reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.GET_ALL_FILM_UPDATES },
    )).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('get all film updates success reducer', () => {
    const data = [{
      film_update_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      update: 'test update',
    }];

    expect(reducer.default(
      initialState,
      { type: actions.GET_ALL_FILM_UPDATES_SUCCESS, data },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      filmUpdates: data,
    });
  });

  it('get all film updates fail reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.GET_ALL_FILM_UPDATES_FAIL },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      error: undefined,
    });
  });
});

describe('Get a film update reducer', () => {
  it('Empty reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.GET_FILM_UPDATE },
    )).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('get a film update success reducer', () => {
    const data = {
      film_update_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      update: 'test update',
    };

    expect(reducer.default(
      initialState,
      { type: actions.GET_FILM_UPDATE_SUCCESS, data },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      filmUpdates: [data],
    });
  });

  it('get a film update fail reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.GET_FILM_UPDATE_FAIL },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      error: undefined,
    });
  });
});

describe('Add a film update reducer', () => {
  it('Empty reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.ADD_FILM_UPDATE },
    )).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('add a film update success reducer', () => {
    const data = {
      film_update_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      update: 'test update',
    };

    expect(reducer.default(
      initialState,
      { type: actions.ADD_FILM_UPDATE_SUCCESS, data },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      filmUpdates: [data],
    });
  });

  it('add a film update fail reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.ADD_FILM_UPDATE_FAIL },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      error: undefined,
    });
  });
});

describe('Update a film update reducer', () => {
  it('Empty reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.UPDATE_FILM_UPDATE },
    )).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('update a film update success reducer', () => {
    const data = {
      film_update_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      update: 'test update',
    };
    const editedData = {
      film_update_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      update: 'updated test update',
    };

    expect(reducer.default(
      { ...initialState, filmUpdates: [data] },
      { type: actions.UPDATE_FILM_UPDATE_SUCCESS, data: editedData },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      filmUpdates: [editedData],
    });
  });

  it('update a film update fail reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.UPDATE_FILM_UPDATE_FAIL },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      error: undefined,
    });
  });
});

describe('Delete a film update reducer', () => {
  it('Empty reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.DELETE_FILM_UPDATE },
    )).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('delete a film update success reducer', () => {
    const data = {
      film_update_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      update: 'test comment',
    };

    expect(reducer.default(
      { ...initialState, filmUpdates: [data] },
      {
        type: actions.DELETE_FILM_UPDATE_SUCCESS,
        film_update_uuid: data.film_update_uuid,
      },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      filmUpdates: [],
    });
  });

  it('delete a film update fail reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.DELETE_FILM_UPDATE_FAIL },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      error: undefined,
    });
  });
});

describe('Get all film comments reducer', () => {
  it('Empty reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.GET_ALL_FILM_COMMENTS },
    )).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('get all film comments success reducer', () => {
    const data = [{
      film_comment_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      comment: 'test comment',
    }];

    expect(reducer.default(
      initialState,
      { type: actions.GET_ALL_FILM_COMMENTS_SUCCESS, data },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      filmComments: data,
    });
  });

  it('get all film comments fail reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.GET_ALL_FILM_COMMENTS_FAIL },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      error: undefined,
    });
  });
});

describe('Get a film comment reducer', () => {
  it('Empty reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.GET_FILM_COMMENT },
    )).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('get a film comment success reducer', () => {
    const data = {
      film_comment_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      comment: 'test comment',
    };

    expect(reducer.default(
      initialState,
      { type: actions.GET_FILM_COMMENT_SUCCESS, data },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      filmComments: [data],
    });
  });

  it('get a film comment fail reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.GET_FILM_COMMENT_FAIL },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      error: undefined,
    });
  });
});

describe('Add a film comment reducer', () => {
  it('Empty reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.ADD_FILM_COMMENT },
    )).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('add a film comment success reducer', () => {
    const data = {
      film_comment_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      comment: 'test comment',
    };

    expect(reducer.default(
      initialState,
      { type: actions.ADD_FILM_COMMENT_SUCCESS, data },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      filmComments: [data],
    });
  });

  it('add a film comment fail reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.ADD_FILM_COMMENT_FAIL },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      error: undefined,
    });
  });
});

describe('Update a film comment reducer', () => {
  it('Empty reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.UPDATE_FILM_COMMENT },
    )).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('update a film comment success reducer', () => {
    const data = {
      film_comment_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      comment: 'test comment',
    };
    const editedData = {
      film_comment_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      comment: 'commentd test comment',
    };

    expect(reducer.default(
      { ...initialState, filmComments: [data] },
      { type: actions.UPDATE_FILM_COMMENT_SUCCESS, data: editedData },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      filmComments: [editedData],
    });
  });

  it('update a film comment fail reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.UPDATE_FILM_COMMENT_FAIL },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      error: undefined,
    });
  });
});

describe('Delete a film comment reducer', () => {
  it('Empty reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.DELETE_FILM_COMMENT },
    )).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('delete a film comment success reducer', () => {
    const data = {
      film_comment_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      comment: 'test comment',
    };

    expect(reducer.default(
      { ...initialState, filmComments: [data] },
      {
        type: actions.DELETE_FILM_COMMENT_SUCCESS,
        film_comment_uuid: data.film_comment_uuid,
      },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      filmComments: [],
    });
  });

  it('delete a film comment fail reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.DELETE_FILM_COMMENT_FAIL },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      error: undefined,
    });
  });
});

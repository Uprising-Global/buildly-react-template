import * as actions from './project.actions';

describe('actions', () => {
  it('should create an action to get all films', () => {
    const expectedAction = { type: actions.GET_ALL_FILMS };
    expect(actions.getAllFilms()).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to get a film', () => {
    const film_uuid = 'esioy427-sdg329-q39857qgb-wquryqw';
    const expectedAction = { type: actions.GET_FILM, film_uuid };
    expect(actions.getFilm(film_uuid)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to add a new film', () => {
    const data = { name: 'Test film' };
    const expectedAction = { type: actions.ADD_FILM, data };
    expect(actions.addFilm(data)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to update a film', () => {
    const data = { name: 'Updated test film' };
    const expectedAction = { type: actions.UPDATE_FILM, data };
    expect(actions.updateFilm(data)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to delete a film', () => {
    const film_uuid = 'esioy427-sdg329-q39857qgb-wquryqw';
    const expectedAction = { type: actions.DELETE_FILM, film_uuid };
    expect(actions.deleteFilm(film_uuid)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to get all film updates', () => {
    const film_uuid = 'esioy427-sdg329-q39857qgb-wquryqw';
    const expectedAction = { type: actions.GET_ALL_FILM_UPDATES, film_uuid };
    expect(actions.getAllFilmUpdates(film_uuid)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to get a film update', () => {
    const film_update_uuid = 'esioy427-sdg329-q39857qgb-wquryqw';
    const expectedAction = { type: actions.GET_FILM_UPDATE, film_update_uuid };
    expect(actions.getFilmUpdate(film_update_uuid)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to add a new film update', () => {
    const data = { update: 'Test film update' };
    const expectedAction = { type: actions.ADD_FILM_UPDATE, data };
    expect(actions.addFilmUpdate(data)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to update a film update', () => {
    const data = { update: 'Updated test film update' };
    const expectedAction = { type: actions.UPDATE_FILM_UPDATE, data };
    expect(actions.updateFilmUpdate(data)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to delete a film update', () => {
    const film_update_uuid = 'esioy427-sdg329-q39857qgb-wquryqw';
    const expectedAction = { type: actions.DELETE_FILM_UPDATE, film_update_uuid };
    expect(actions.deleteFilmUpdate(film_update_uuid)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to get all film comments', () => {
    const film_uuid = 'esioy427-sdg329-q39857qgb-wquryqw';
    const expectedAction = { type: actions.GET_ALL_FILM_COMMENTS, film_uuid };
    expect(actions.getAllFilmComments(film_uuid)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to get a film comment', () => {
    const film_comment_uuid = 'esioy427-sdg329-q39857qgb-wquryqw';
    const expectedAction = { type: actions.GET_FILM_COMMENT, film_comment_uuid };
    expect(actions.getFilmComment(film_comment_uuid)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to add a new film comment', () => {
    const data = { comment: 'Test comment' };
    const expectedAction = { type: actions.ADD_FILM_COMMENT, data };
    expect(actions.addFilmComment(data)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to update a film comment', () => {
    const data = { comment: 'Updated test comment' };
    const expectedAction = { type: actions.UPDATE_FILM_COMMENT, data };
    expect(actions.updateFilmComment(data)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to delete a film comment', () => {
    const film_comment_uuid = 'esioy427-sdg329-q39857qgb-wquryqw';
    const expectedAction = { type: actions.DELETE_FILM_COMMENT, film_comment_uuid };
    expect(actions.deleteFilmComment(film_comment_uuid)).toEqual(expectedAction);
  });
});

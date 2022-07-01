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
  it('should create an action to get all cast crew for a film', () => {
    const film_uuid = 'esioy427-sdg329-q39857qgb-wquryqw';
    const expectedAction = { type: actions.GET_ALL_FILM_CAST_CREW, film_uuid };
    expect(actions.getFilmCastCrew(film_uuid)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to get all dealterm for a film', () => {
    const film_uuid = 'esioy427-sdg329-q39857qgb-wquryqw';
    const expectedAction = { type: actions.GET_ALL_FILM_DEAL_TERM, film_uuid };
    expect(actions.getFilmDealTerm(film_uuid)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to get all updates for a film', () => {
    const film_uuid = 'esioy427-sdg329-q39857qgb-wquryqw';
    const expectedAction = { type: actions.GET_ALL_FILM_UPDATES, film_uuid };
    expect(actions.getFilmUpdates(film_uuid)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to edit an update', () => {
    const update_uuid = 'esioy427-sdg329-q39857qgb-wquryqw';
    const data = { name: 'edited update' };
    const expectedAction = { type: actions.EDIT_UPDATE, update_uuid, data };
    expect(actions.editUpdate(update_uuid, data)).toEqual(expectedAction);
  });
});

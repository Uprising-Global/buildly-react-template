import * as actions from './project.actions';
import * as reducer from './project.reducer';

const initialState = {
  loading: false,
  loaded: false,
  films: [],
  castCrew: null,
  dealTerm: null,
  filmUpdates: null,
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

describe('Get cast crew for a film reducer', () => {
  it('Empty reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.GET_ALL_FILM_CAST_CREW },
    )).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('get cast crew for a film success reducer', () => {
    const data = {
      film_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      director_name: 'test director',
    };

    expect(reducer.default(
      initialState,
      { type: actions.GET_ALL_FILM_CAST_CREW_SUCCESS, data },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      castCrew: data,
    });
  });

  it('get cast crew for a film fail reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.GET_ALL_FILM_CAST_CREW_FAIL },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      error: undefined,
    });
  });
});

describe('Get deal term for a film reducer', () => {
  it('Empty reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.GET_ALL_FILM_DEAL_TERM },
    )).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('get deal term for a film success reducer', () => {
    const data = {
      film_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      production_budget: 200000000,
    };

    expect(reducer.default(
      initialState,
      { type: actions.GET_ALL_FILM_DEAL_TERM_SUCCESS, data },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      dealTerm: data,
    });
  });

  it('get deal term for a film fail reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.GET_ALL_FILM_DEAL_TERM_FAIL },
    )).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      error: undefined,
    });
  });
});

describe('Get updates for a film reducer', () => {
  it('Empty reducer', () => {
    expect(reducer.default(
      initialState,
      { type: actions.GET_ALL_FILM_UPDATES },
    )).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('get updates for a film success reducer', () => {
    const data = [{
      film_uuid: 'kfhwue-y38wgws-3i2wfhv-84gheu',
      name: 'test update',
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

  it('get updates for a film fail reducer', () => {
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

import _ from 'lodash';
import {
  GET_ALL_FILMS,
  GET_ALL_FILMS_SUCCESS,
  GET_ALL_FILMS_FAIL,
  GET_FILM,
  GET_FILM_SUCCESS,
  GET_FILM_FAIL,
  GET_ALL_FILM_CAST_CREW,
  GET_ALL_FILM_CAST_CREW_SUCCESS,
  GET_ALL_FILM_CAST_CREW_FAIL,
  GET_ALL_FILM_DEAL_TERM,
  GET_ALL_FILM_DEAL_TERM_SUCCESS,
  GET_ALL_FILM_DEAL_TERM_FAIL,
  GET_ALL_FILM_UPDATES,
  GET_ALL_FILM_UPDATES_SUCCESS,
  GET_ALL_FILM_UPDATES_FAIL,
  EDIT_UPDATE,
  EDIT_UPDATE_SUCCESS,
  EDIT_UPDATE_FAIL,
} from './project.actions';

const initialState = {
  loading: false,
  loaded: false,
  films: [],
  castCrew: null,
  dealTerm: null,
  filmUpdates: null,
  error: null,
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FILMS:
    case GET_FILM:
    case GET_ALL_FILM_CAST_CREW:
    case GET_ALL_FILM_DEAL_TERM:
    case GET_ALL_FILM_UPDATES:
    case EDIT_UPDATE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ALL_FILMS_FAIL:
    case GET_FILM_FAIL:
    case GET_ALL_FILM_CAST_CREW_FAIL:
    case GET_ALL_FILM_DEAL_TERM_FAIL:
    case GET_ALL_FILM_UPDATES_FAIL:
    case EDIT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.error,
      };

    case GET_ALL_FILMS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        films: action.data,
      };

    case GET_FILM_SUCCESS: {
      const found = _.find(
        state.films,
        { film_uuid: action.data.film_uuid },
      );
      const films = found
        ? _.map(state.films, (film) => (
          film.film_uuid === action.data.film_uuid
            ? action.data
            : film
        ))
        : [...state.films, action.data];

      return {
        ...state,
        loading: false,
        loaded: true,
        films,
      };
    }

    case GET_ALL_FILM_CAST_CREW_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        castCrew: action.data,
      };

    case GET_ALL_FILM_DEAL_TERM_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        dealTerm: action.data,
      };

    case GET_ALL_FILM_UPDATES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        filmUpdates: action.data,
      };

    case EDIT_UPDATE_SUCCESS: {
      const updates = _.map(state.filmUpdates, (updt) => (
        updt.update_uuid === action.data.update_uuid
          ? action.data
          : updt
      ));
      return {
        ...state,
        loading: false,
        loaded: true,
        filmUpdates: updates,
      };
    }

    default:
      return state;
  }
};

import _ from 'lodash';
import {
  GET_ALL_FILMS,
  GET_ALL_FILMS_SUCCESS,
  GET_ALL_FILMS_FAIL,
  GET_ALL_FILM_UPDATES,
  GET_ALL_FILM_UPDATES_SUCCESS,
  GET_ALL_FILM_UPDATES_FAIL,
  GET_ALL_FILM_COMMENTS,
  GET_ALL_FILM_COMMENTS_SUCCESS,
  GET_ALL_FILM_COMMENTS_FAIL,
  GET_FILM,
  GET_FILM_SUCCESS,
  GET_FILM_FAIL,
  GET_FILM_UPDATE,
  GET_FILM_UPDATE_SUCCESS,
  GET_FILM_UPDATE_FAIL,
  GET_FILM_COMMENT,
  GET_FILM_COMMENT_SUCCESS,
  GET_FILM_COMMENT_FAIL,
  ADD_FILM,
  ADD_FILM_SUCCESS,
  ADD_FILM_FAIL,
  ADD_FILM_UPDATE,
  ADD_FILM_UPDATE_SUCCESS,
  ADD_FILM_UPDATE_FAIL,
  ADD_FILM_COMMENT,
  ADD_FILM_COMMENT_SUCCESS,
  ADD_FILM_COMMENT_FAIL,
  UPDATE_FILM,
  UPDATE_FILM_SUCCESS,
  UPDATE_FILM_FAIL,
  UPDATE_FILM_UPDATE,
  UPDATE_FILM_UPDATE_SUCCESS,
  UPDATE_FILM_UPDATE_FAIL,
  UPDATE_FILM_COMMENT,
  UPDATE_FILM_COMMENT_SUCCESS,
  UPDATE_FILM_COMMENT_FAIL,
  DELETE_FILM,
  DELETE_FILM_SUCCESS,
  DELETE_FILM_FAIL,
  DELETE_FILM_UPDATE,
  DELETE_FILM_UPDATE_SUCCESS,
  DELETE_FILM_UPDATE_FAIL,
  DELETE_FILM_COMMENT,
  DELETE_FILM_COMMENT_SUCCESS,
  DELETE_FILM_COMMENT_FAIL,
} from './project.actions';

const initialState = {
  loading: false,
  loaded: false,
  films: [],
  filmUpdates: [],
  filmComments: [],
  error: null,
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FILMS:
    case GET_ALL_FILM_UPDATES:
    case GET_ALL_FILM_COMMENTS:
    case GET_FILM:
    case GET_FILM_UPDATE:
    case GET_FILM_COMMENT:
    case ADD_FILM:
    case ADD_FILM_UPDATE:
    case ADD_FILM_COMMENT:
    case UPDATE_FILM:
    case UPDATE_FILM_UPDATE:
    case UPDATE_FILM_COMMENT:
    case DELETE_FILM:
    case DELETE_FILM_UPDATE:
    case DELETE_FILM_COMMENT:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ALL_FILMS_FAIL:
    case GET_ALL_FILM_UPDATES_FAIL:
    case GET_ALL_FILM_COMMENTS_FAIL:
    case GET_FILM_FAIL:
    case GET_FILM_UPDATE_FAIL:
    case GET_FILM_COMMENT_FAIL:
    case ADD_FILM_FAIL:
    case ADD_FILM_UPDATE_FAIL:
    case ADD_FILM_COMMENT_FAIL:
    case UPDATE_FILM_FAIL:
    case UPDATE_FILM_UPDATE_FAIL:
    case UPDATE_FILM_COMMENT_FAIL:
    case DELETE_FILM_FAIL:
    case DELETE_FILM_UPDATE_FAIL:
    case DELETE_FILM_COMMENT_FAIL:
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

    case GET_ALL_FILM_UPDATES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        filmUpdates: action.data,
      };

    case GET_ALL_FILM_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        filmComments: action.data,
      };

    case GET_FILM_SUCCESS:
    case ADD_FILM_SUCCESS:
    case UPDATE_FILM_SUCCESS: {
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

    case GET_FILM_UPDATE_SUCCESS:
    case ADD_FILM_UPDATE_SUCCESS:
    case UPDATE_FILM_UPDATE_SUCCESS: {
      const found = _.find(
        state.filmUpdates,
        { film_update_uuid: action.data.film_update_uuid },
      );
      const filmUpdates = found
        ? _.map(state.filmUpdates, (filmUpdate) => (
          filmUpdate.film_update_uuid === action.data.film_update_uuid
            ? action.data
            : filmUpdate
        ))
        : [...state.filmUpdates, action.data];

      return {
        ...state,
        loading: false,
        loaded: true,
        filmUpdates,
      };
    }

    case GET_FILM_COMMENT_SUCCESS:
    case ADD_FILM_COMMENT_SUCCESS:
    case UPDATE_FILM_COMMENT_SUCCESS: {
      const found = _.find(
        state.filmComments,
        { film_comment_uuid: action.data.film_comment_uuid },
      );
      const filmComments = found
        ? _.map(state.filmComments, (filmComment) => (
          filmComment.film_comment_uuid === action.data.film_comment_uuid
            ? action.data
            : filmComment
        ))
        : [...state.filmComments, action.data];

      return {
        ...state,
        loading: false,
        loaded: true,
        filmComments,
      };
    }

    case DELETE_FILM_SUCCESS: {
      const { films } = state;
      _.remove(films, { film_uuid: action.film_uuid });

      return {
        ...state,
        loading: false,
        loaded: true,
        films,
      };
    }

    case DELETE_FILM_UPDATE_SUCCESS: {
      const { filmUpdates } = state;
      _.remove(filmUpdates, { film_update_uuid: action.film_update_uuid });

      return {
        ...state,
        loading: false,
        loaded: true,
        filmUpdates,
      };
    }

    case DELETE_FILM_COMMENT_SUCCESS: {
      const { filmComments } = state;
      _.remove(filmComments, { film_comment_uuid: action.film_comment_uuid });

      return {
        ...state,
        loading: false,
        loaded: true,
        filmComments,
      };
    }

    default:
      return state;
  }
};

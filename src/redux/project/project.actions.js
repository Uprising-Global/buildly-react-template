// Project action types
export const GET_ALL_FILMS = 'PROJECT/GET_ALL_FILMS';
export const GET_ALL_FILMS_SUCCESS = 'PROJECT/GET_ALL_FILMS_SUCCESS';
export const GET_ALL_FILMS_FAIL = 'PROJECT/GET_ALL_FILMS_FAIL';

export const GET_FILM = 'PROJECT/GET_FILM';
export const GET_FILM_SUCCESS = 'PROJECT/GET_FILM_SUCCESS';
export const GET_FILM_FAIL = 'PROJECT/GET_FILM_FAIL';

export const ADD_FILM = 'PROJECT/ADD_FILM';
export const ADD_FILM_SUCCESS = 'PROJECT/ADD_FILM_SUCCESS';
export const ADD_FILM_FAIL = 'PROJECT/ADD_FILM_FAIL';

export const UPDATE_FILM = 'PROJECT/UPDATE_FILM';
export const UPDATE_FILM_SUCCESS = 'PROJECT/UPDATE_FILM_SUCCESS';
export const UPDATE_FILM_FAIL = 'PROJECT/UPDATE_FILM_FAIL';

export const DELETE_FILM = 'PROJECT/DELETE_FILM';
export const DELETE_FILM_SUCCESS = 'PROJECT/DELETE_FILM_SUCCESS';
export const DELETE_FILM_FAIL = 'PROJECT/DELETE_FILM_FAIL';

export const GET_ALL_FILM_UPDATES = 'PROJECT/GET_ALL_FILM_UPDATES';
export const GET_ALL_FILM_UPDATES_SUCCESS = 'PROJECT/GET_ALL_FILM_UPDATES_SUCCESS';
export const GET_ALL_FILM_UPDATES_FAIL = 'PROJECT/GET_ALL_FILM_UPDATES_FAIL';

export const GET_FILM_UPDATE = 'PROJECT/GET_FILM_UPDATE';
export const GET_FILM_UPDATE_SUCCESS = 'PROJECT/GET_FILM_UPDATE_SUCCESS';
export const GET_FILM_UPDATE_FAIL = 'PROJECT/GET_FILM_UPDATE_FAIL';

export const ADD_FILM_UPDATE = 'PROJECT/ADD_FILM_UPDATE';
export const ADD_FILM_UPDATE_SUCCESS = 'PROJECT/ADD_FILM_UPDATE_SUCCESS';
export const ADD_FILM_UPDATE_FAIL = 'PROJECT/ADD_FILM_UPDATE_FAIL';

export const UPDATE_FILM_UPDATE = 'PROJECT/UPDATE_FILM_UPDATE';
export const UPDATE_FILM_UPDATE_SUCCESS = 'PROJECT/UPDATE_FILM_UPDATE_SUCCESS';
export const UPDATE_FILM_UPDATE_FAIL = 'PROJECT/UPDATE_FILM_UPDATE_FAIL';

export const DELETE_FILM_UPDATE = 'PROJECT/DELETE_FILM_UPDATE';
export const DELETE_FILM_UPDATE_SUCCESS = 'PROJECT/DELETE_FILM_UPDATE_SUCCESS';
export const DELETE_FILM_UPDATE_FAIL = 'PROJECT/DELETE_FILM_UPDATE_FAIL';

export const GET_ALL_FILM_COMMENTS = 'PROJECT/GET_ALL_FILM_COMMENTS';
export const GET_ALL_FILM_COMMENTS_SUCCESS = 'PROJECT/GET_ALL_FILM_COMMENTS_SUCCESS';
export const GET_ALL_FILM_COMMENTS_FAIL = 'PROJECT/GET_ALL_FILM_COMMENTS_FAIL';

export const GET_FILM_COMMENT = 'PROJECT/GET_FILM_COMMENT';
export const GET_FILM_COMMENT_SUCCESS = 'PROJECT/GET_FILM_COMMENT_SUCCESS';
export const GET_FILM_COMMENT_FAIL = 'PROJECT/GET_FILM_COMMENT_FAIL';

export const ADD_FILM_COMMENT = 'PROJECT/ADD_FILM_COMMENT';
export const ADD_FILM_COMMENT_SUCCESS = 'PROJECT/ADD_FILM_COMMENT_SUCCESS';
export const ADD_FILM_COMMENT_FAIL = 'PROJECT/ADD_FILM_COMMENT_FAIL';

export const UPDATE_FILM_COMMENT = 'PROJECT/UPDATE_FILM_COMMENT';
export const UPDATE_FILM_COMMENT_SUCCESS = 'PROJECT/UPDATE_FILM_COMMENT_SUCCESS';
export const UPDATE_FILM_COMMENT_FAIL = 'PROJECT/UPDATE_FILM_COMMENT_FAIL';

export const DELETE_FILM_COMMENT = 'PROJECT/DELETE_FILM_COMMENT';
export const DELETE_FILM_COMMENT_SUCCESS = 'PROJECT/DELETE_FILM_COMMENT_SUCCESS';
export const DELETE_FILM_COMMENT_FAIL = 'PROJECT/DELETE_FILM_COMMENT_FAIL';

/**
 * Get all films action
 */
export const getAllFilms = () => ({ type: GET_ALL_FILMS });

/**
 * Get film action
 * @param film_uuid
 */
export const getFilm = (film_uuid) => ({ type: GET_FILM, film_uuid });

/**
 * Add film action
 * @param data
 */
export const addFilm = (data) => ({ type: ADD_FILM, data });

/**
 * Update film action
 * @param data
 */
export const updateFilm = (data) => ({ type: UPDATE_FILM, data });

/**
 * Delete film action
 * @param film_uuid
 */
export const deleteFilm = (film_uuid) => ({ type: DELETE_FILM, film_uuid });

/**
 * Get all film updates action
 */
export const getAllFilmUpdates = (film_uuid) => ({ type: GET_ALL_FILM_UPDATES, film_uuid });

/**
 * Get film update action
 * @param film_update_uuid
 */
export const getFilmUpdate = (film_update_uuid) => ({ type: GET_FILM_UPDATE, film_update_uuid });

/**
 * Add film update action
 * @param data
 */
export const addFilmUpdate = (data) => ({ type: ADD_FILM_UPDATE, data });

/**
 * Update film update action
 * @param data
 */
export const updateFilmUpdate = (data) => ({ type: UPDATE_FILM_UPDATE, data });

/**
 * Delete fil update action
 * @param film_update_uuid
 */
export const deleteFilmUpdate = (film_update_uuid) => ({
  type: DELETE_FILM_UPDATE,
  film_update_uuid,
});

/**
 * Get all film comments action
 */
export const getAllFilmComments = (film_uuid) => ({ type: GET_ALL_FILM_COMMENTS, film_uuid });

/**
 * Get film comment action
 * @param film_comment_uuid
 */
export const getFilmComment = (film_comment_uuid) => ({
  type: GET_FILM_COMMENT,
  film_comment_uuid,
});

/**
 * Add film comment action
 * @param data
 */
export const addFilmComment = (data) => ({ type: ADD_FILM_COMMENT, data });

/**
 * Update film comment action
 * @param data
 */
export const updateFilmComment = (data) => ({ type: UPDATE_FILM_COMMENT, data });

/**
 * Delete film comment action
 * @param film_comment_uuid
 */
export const deleteFilmComment = (film_comment_uuid) => ({
  type: DELETE_FILM_COMMENT,
  film_comment_uuid,
});

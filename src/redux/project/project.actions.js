// Project action types
export const GET_ALL_FILMS = 'PROJECT/GET_ALL_FILMS';
export const GET_ALL_FILMS_SUCCESS = 'PROJECT/GET_ALL_FILMS_SUCCESS';
export const GET_ALL_FILMS_FAIL = 'PROJECT/GET_ALL_FILMS_FAIL';

export const GET_FILM = 'PROJECT/GET_FILM';
export const GET_FILM_SUCCESS = 'PROJECT/GET_FILM_SUCCESS';
export const GET_FILM_FAIL = 'PROJECT/GET_FILM_FAIL';

export const GET_ALL_FILM_CAST_CREW = 'PROJECT/GET_ALL_FILM_CAST_CREW';
export const GET_ALL_FILM_CAST_CREW_SUCCESS = 'PROJECT/GET_ALL_FILM_CAST_CREW_SUCCESS';
export const GET_ALL_FILM_CAST_CREW_FAIL = 'PROJECT/GET_ALL_FILM_CAST_CREW_FAIL';

export const GET_ALL_FILM_DEAL_TERM = 'PROJECT/GET_ALL_FILM_DEAL_TERM';
export const GET_ALL_FILM_DEAL_TERM_SUCCESS = 'PROJECT/GET_ALL_FILM_DEAL_TERM_SUCCESS';
export const GET_ALL_FILM_DEAL_TERM_FAIL = 'PROJECT/GET_ALL_FILM_DEAL_TERM_FAIL';

export const GET_ALL_FILM_UPDATES = 'PROJECT/GET_ALL_FILM_UPDATES';
export const GET_ALL_FILM_UPDATES_SUCCESS = 'PROJECT/GET_ALL_FILM_UPDATES_SUCCESS';
export const GET_ALL_FILM_UPDATES_FAIL = 'PROJECT/GET_ALL_FILM_UPDATES_FAIL';

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
 * Get all cast crew for a film action
 * @param film_uuid
 */
export const getFilmCastCrew = (film_uuid) => ({ type: GET_ALL_FILM_CAST_CREW, film_uuid });

/**
 * Get all deal term for a film action
 * @param film_uuid
 */
export const getFilmDealTerm = (film_uuid) => ({ type: GET_ALL_FILM_DEAL_TERM, film_uuid });

/**
 * Get all updates for a film action
 * @param film_uuid
 */
export const getFilmUpdates = (film_uuid) => ({ type: GET_ALL_FILM_UPDATES, film_uuid });

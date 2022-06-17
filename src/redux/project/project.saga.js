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
} from '@redux/project/project.actions';
import {
  put, takeLatest, all, call,
} from 'redux-saga/effects';
import { httpService } from '@modules/http/http.service';
import { showAlert } from '@redux/alert/alert.actions';

const projectEndpoint = 'project/';

function* getAllFilms(payload) {
  try {
    const films = yield call(
      httpService.makeRequest,
      'get',
      `${window.env.API_URL}${projectEndpoint}film/`,
    );
    yield put({ type: GET_ALL_FILMS_SUCCESS, data: films.data });
  } catch (error) {
    yield [
      yield put(
        showAlert({
          type: 'error',
          open: true,
          message: 'Couldn\'t fetch all films!',
        }),
      ),
      yield put({
        type: GET_ALL_FILMS_FAIL,
        error,
      }),
    ];
  }
}

function* getFilm(payload) {
  try {
    const film = yield call(
      httpService.makeRequest,
      'get',
      `${window.env.API_URL}${projectEndpoint}film/${payload.film_uuid}`,
    );
    yield put({ type: GET_FILM_SUCCESS, data: film.data });
  } catch (error) {
    yield [
      yield put(
        showAlert({
          type: 'error',
          open: true,
          message: 'Couldn\'t fetch the film!',
        }),
      ),
      yield put({
        type: GET_FILM_FAIL,
        error,
      }),
    ];
  }
}

function* addFilm(payload) {
  try {
    const film = yield call(
      httpService.makeRequest,
      'post',
      `${window.env.API_URL}${projectEndpoint}film/`,
      payload.data,
    );
    yield put({ type: ADD_FILM_SUCCESS, data: film.data });
  } catch (error) {
    yield [
      yield put(
        showAlert({
          type: 'error',
          open: true,
          message: 'Couldn\'t create film!',
        }),
      ),
      yield put({
        type: ADD_FILM_FAIL,
        error,
      }),
    ];
  }
}

function* updateFilm(payload) {
  try {
    const film = yield call(
      httpService.makeRequest,
      'put',
      `${window.env.API_URL}${projectEndpoint}film/${payload.data.film_uuid}`,
      payload.data,
    );
    yield put({ type: UPDATE_FILM_SUCCESS, data: film.data });
  } catch (error) {
    yield [
      yield put(
        showAlert({
          type: 'error',
          open: true,
          message: 'Couldn\'t update film!',
        }),
      ),
      yield put({
        type: UPDATE_FILM_FAIL,
        error,
      }),
    ];
  }
}

function* deleteFilm(payload) {
  const { film_uuid } = payload;
  try {
    const film = yield call(
      httpService.makeRequest,
      'delete',
      `${window.env.API_URL}${projectEndpoint}film/${film_uuid}`,
    );
    yield put({ type: DELETE_FILM_SUCCESS, film_uuid });
  } catch (error) {
    yield [
      yield put(
        showAlert({
          type: 'error',
          open: true,
          message: 'Couldn\'t delete film!',
        }),
      ),
      yield put({
        type: DELETE_FILM_FAIL,
        error,
      }),
    ];
  }
}

function* getAllFilmUpdates(payload) {
  try {
    const filmUpdates = yield call(
      httpService.makeRequest,
      'get',
      `${window.env.API_URL}${projectEndpoint}film-update/?film_uuid=${payload.film_uuid}`,
    );
    yield put({ type: GET_ALL_FILM_UPDATES_SUCCESS, data: filmUpdates.data });
  } catch (error) {
    yield [
      yield put(
        showAlert({
          type: 'error',
          open: true,
          message: 'Couldn\'t fetch all film updates!',
        }),
      ),
      yield put({
        type: GET_ALL_FILM_UPDATES_FAIL,
        error,
      }),
    ];
  }
}

function* getFilmUpdate(payload) {
  try {
    const filmUpdate = yield call(
      httpService.makeRequest,
      'get',
      `${window.env.API_URL}${projectEndpoint}film-update/${payload.film_update_uuid}`,
    );
    yield put({ type: GET_FILM_UPDATE_SUCCESS, data: filmUpdate.data });
  } catch (error) {
    yield [
      yield put(
        showAlert({
          type: 'error',
          open: true,
          message: 'Couldn\'t fetch the film update!',
        }),
      ),
      yield put({
        type: GET_FILM_UPDATE_FAIL,
        error,
      }),
    ];
  }
}

function* addFilmUpdate(payload) {
  try {
    const filmUpdate = yield call(
      httpService.makeRequest,
      'post',
      `${window.env.API_URL}${projectEndpoint}film-update/`,
      payload.data,
    );
    yield put({ type: ADD_FILM_UPDATE_SUCCESS, data: filmUpdate.data });
  } catch (error) {
    yield [
      yield put(
        showAlert({
          type: 'error',
          open: true,
          message: 'Couldn\'t create film update!',
        }),
      ),
      yield put({
        type: ADD_FILM_UPDATE_FAIL,
        error,
      }),
    ];
  }
}

function* updateFilmUpdate(payload) {
  try {
    const filmUpdate = yield call(
      httpService.makeRequest,
      'put',
      `${window.env.API_URL}${projectEndpoint}film-update/${payload.data.film_update_uuid}`,
      payload.data,
    );
    yield put({ type: UPDATE_FILM_UPDATE_SUCCESS, data: filmUpdate.data });
  } catch (error) {
    yield [
      yield put(
        showAlert({
          type: 'error',
          open: true,
          message: 'Couldn\'t update film update!',
        }),
      ),
      yield put({
        type: UPDATE_FILM_UPDATE_FAIL,
        error,
      }),
    ];
  }
}

function* deleteFilmUpdate(payload) {
  const { film_update_uuid } = payload;
  try {
    const filmUpdate = yield call(
      httpService.makeRequest,
      'delete',
      `${window.env.API_URL}${projectEndpoint}film-update/${film_update_uuid}`,
    );
    yield put({ type: DELETE_FILM_UPDATE_SUCCESS, film_update_uuid });
  } catch (error) {
    yield [
      yield put(
        showAlert({
          type: 'error',
          open: true,
          message: 'Couldn\'t delete film update!',
        }),
      ),
      yield put({
        type: DELETE_FILM_UPDATE_FAIL,
        error,
      }),
    ];
  }
}

function* getAllFilmComments(payload) {
  try {
    const filmComments = yield call(
      httpService.makeRequest,
      'get',
      `${window.env.API_URL}${projectEndpoint}film-comment/?film_uuid=${payload.film_uuid}`,
    );
    yield put({ type: GET_ALL_FILM_COMMENTS_SUCCESS, data: filmComments.data });
  } catch (error) {
    yield [
      yield put(
        showAlert({
          type: 'error',
          open: true,
          message: 'Couldn\'t fetch all film comments!',
        }),
      ),
      yield put({
        type: GET_ALL_FILM_COMMENTS_FAIL,
        error,
      }),
    ];
  }
}

function* getFilmComment(payload) {
  try {
    const filmComment = yield call(
      httpService.makeRequest,
      'get',
      `${window.env.API_URL}${projectEndpoint}film-comment/${payload.film_comment_uuid}`,
    );
    yield put({ type: GET_FILM_COMMENT_SUCCESS, data: filmComment.data });
  } catch (error) {
    yield [
      yield put(
        showAlert({
          type: 'error',
          open: true,
          message: 'Couldn\'t fetch the film comment!',
        }),
      ),
      yield put({
        type: GET_FILM_COMMENT_FAIL,
        error,
      }),
    ];
  }
}

function* addFilmComment(payload) {
  try {
    const filmComment = yield call(
      httpService.makeRequest,
      'post',
      `${window.env.API_URL}${projectEndpoint}film-comment/`,
      payload.data,
    );
    yield put({ type: ADD_FILM_COMMENT_SUCCESS, data: filmComment.data });
  } catch (error) {
    yield [
      yield put(
        showAlert({
          type: 'error',
          open: true,
          message: 'Couldn\'t create film comment!',
        }),
      ),
      yield put({
        type: ADD_FILM_COMMENT_FAIL,
        error,
      }),
    ];
  }
}

function* updateFilmComment(payload) {
  try {
    const filmComment = yield call(
      httpService.makeRequest,
      'put',
      `${window.env.API_URL}${projectEndpoint}film-comment/${payload.data.film_comment_uuid}`,
      payload.data,
    );
    yield put({ type: UPDATE_FILM_COMMENT_SUCCESS, data: filmComment.data });
  } catch (error) {
    yield [
      yield put(
        showAlert({
          type: 'error',
          open: true,
          message: 'Couldn\'t update film comment!',
        }),
      ),
      yield put({
        type: UPDATE_FILM_COMMENT_FAIL,
        error,
      }),
    ];
  }
}

function* deleteFilmComment(payload) {
  const { film_comment_uuid } = payload;
  try {
    const filmComment = yield call(
      httpService.makeRequest,
      'delete',
      `${window.env.API_URL}${projectEndpoint}film-comment/${film_comment_uuid}`,
    );
    yield put({ type: DELETE_FILM_COMMENT_SUCCESS, film_comment_uuid });
  } catch (error) {
    yield [
      yield put(
        showAlert({
          type: 'error',
          open: true,
          message: 'Couldn\'t delete film comment!',
        }),
      ),
      yield put({
        type: DELETE_FILM_COMMENT_FAIL,
        error,
      }),
    ];
  }
}

function* watchGetAllFilms() {
  yield takeLatest(GET_ALL_FILMS, getAllFilms);
}

function* watchGetFilm() {
  yield takeLatest(GET_FILM, getFilm);
}

function* watchAddFilm() {
  yield takeLatest(ADD_FILM, addFilm);
}

function* watchUpdateFilm() {
  yield takeLatest(UPDATE_FILM, updateFilm);
}

function* watchDeleteFilm() {
  yield takeLatest(DELETE_FILM, deleteFilm);
}

function* watchGetAllFilmUpdates() {
  yield takeLatest(GET_ALL_FILM_UPDATES, getAllFilmUpdates);
}

function* watchGetFilmUpdate() {
  yield takeLatest(GET_FILM_UPDATE, getFilmUpdate);
}

function* watchAddFilmUpdate() {
  yield takeLatest(ADD_FILM_UPDATE, addFilmUpdate);
}

function* watchUpdateFilmUpdate() {
  yield takeLatest(UPDATE_FILM_UPDATE, updateFilmUpdate);
}

function* watchDeleteFilmUpdate() {
  yield takeLatest(DELETE_FILM_UPDATE, deleteFilmUpdate);
}

function* watchGetAllFilmComments() {
  yield takeLatest(GET_ALL_FILM_COMMENTS, getAllFilmComments);
}

function* watchGetFilmComment() {
  yield takeLatest(GET_FILM_COMMENT, getFilmComment);
}

function* watchAddFilmComment() {
  yield takeLatest(ADD_FILM_COMMENT, addFilmComment);
}

function* watchUpdateFilmComment() {
  yield takeLatest(UPDATE_FILM_COMMENT, updateFilmComment);
}

function* watchDeleteFilmComment() {
  yield takeLatest(DELETE_FILM_COMMENT, deleteFilmComment);
}

export default function* authSaga() {
  yield all([
    watchGetAllFilms(),
    watchGetFilm(),
    watchAddFilm(),
    watchUpdateFilm(),
    watchDeleteFilm(),
    watchGetAllFilmUpdates(),
    watchGetFilmUpdate(),
    watchAddFilmUpdate(),
    watchUpdateFilmUpdate(),
    watchDeleteFilmUpdate(),
    watchGetAllFilmComments(),
    watchGetFilmComment(),
    watchAddFilmComment(),
    watchUpdateFilmComment(),
    watchDeleteFilmComment(),
  ]);
}

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
} from '@redux/project/project.actions';
import {
  put, takeLatest, all, call,
} from 'redux-saga/effects';
import { httpService } from '@modules/http/http.service';
import { showAlert } from '@redux/alert/alert.actions';

const projectEndpoint = 'project/';

function* getAllFilms(payload) {
  try {
    const response = yield call(
      httpService.makeRequest,
      'get',
      `${window.env.API_URL}${projectEndpoint}film/`,
    );
    yield put({ type: GET_ALL_FILMS_SUCCESS, data: response.data });
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
    const response = yield call(
      httpService.makeRequest,
      'get',
      `${window.env.API_URL}${projectEndpoint}film/${payload.film_uuid}`,
    );
    yield put({ type: GET_FILM_SUCCESS, data: response.data });
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

function* getFilmCastCrew(payload) {
  try {
    const response = yield call(
      httpService.makeRequest,
      'get',
      `${window.env.API_URL}${projectEndpoint}cast-crew/?film_uuid=${payload.film_uuid}`,
    );
    yield put({ type: GET_ALL_FILM_CAST_CREW_SUCCESS, data: response.data[0] });
  } catch (error) {
    yield [
      yield put(
        showAlert({
          type: 'error',
          open: true,
          message: 'Couldn\'t fetch the cast crew for the film!',
        }),
      ),
      yield put({
        type: GET_ALL_FILM_CAST_CREW_FAIL,
        error,
      }),
    ];
  }
}

function* getFilmDealTerm(payload) {
  try {
    const response = yield call(
      httpService.makeRequest,
      'get',
      `${window.env.API_URL}${projectEndpoint}deal-terms/?film_uuid=${payload.film_uuid}`,
    );
    yield put({ type: GET_ALL_FILM_DEAL_TERM_SUCCESS, data: response.data[0] });
  } catch (error) {
    yield [
      yield put(
        showAlert({
          type: 'error',
          open: true,
          message: 'Couldn\'t fetch the deal term for the film!',
        }),
      ),
      yield put({
        type: GET_ALL_FILM_DEAL_TERM_FAIL,
        error,
      }),
    ];
  }
}

function* getFilmUpdates(payload) {
  try {
    const response = yield call(
      httpService.makeRequest,
      'get',
      `${window.env.API_URL}${projectEndpoint}update/?film_uuid=${payload.film_uuid}`,
    );
    yield put({ type: GET_ALL_FILM_UPDATES_SUCCESS, data: response.data });
  } catch (error) {
    yield [
      yield put(
        showAlert({
          type: 'error',
          open: true,
          message: 'Couldn\'t fetch the updates for the film!',
        }),
      ),
      yield put({
        type: GET_ALL_FILM_UPDATES_FAIL,
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

function* watchGetFilmCastCrew() {
  yield takeLatest(GET_ALL_FILM_CAST_CREW, getFilmCastCrew);
}

function* watchGetFilmDealTerm() {
  yield takeLatest(GET_ALL_FILM_DEAL_TERM, getFilmDealTerm);
}

function* watchGetFilmUpdates() {
  yield takeLatest(GET_ALL_FILM_UPDATES, getFilmUpdates);
}

export default function* authSaga() {
  yield all([
    watchGetAllFilms(),
    watchGetFilm(),
    watchGetFilmCastCrew(),
    watchGetFilmDealTerm(),
    watchGetFilmUpdates(),
  ]);
}

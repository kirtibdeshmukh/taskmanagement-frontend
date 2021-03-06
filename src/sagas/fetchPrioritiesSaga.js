/** @format */

import { takeLatest, put } from "redux-saga/effects";

import boardActions, {
  prioritiesFetchingSucceeded,
} from "actions/boardActions";

import { getPrioritiesApi } from "apis/boardApis";
import { dangerNotification } from "notificationStore";

export function* fetchPriorities() {
  try {
   
    const response = yield getPrioritiesApi(),
      { data } = response || {};
    yield put(prioritiesFetchingSucceeded(data));
  } catch (error) {
    yield dangerNotification("Failed to fetch priorties");
  }
}

export function* fetchPrioritiesSaga() {
  yield takeLatest(boardActions.fetchPriorites, fetchPriorities);
}

/** @format */

import { takeLatest, put } from "redux-saga/effects";

// import getFormErrors from "helpers/serverErrorsHelper";

import boardActions, {
  boardDeletionSucceeded,
  boardDeletionFailed,
  fetchBoardList
} from "actions/boardActions";

import { deleteBoardApi } from "apis/boardApis";

import { successNotification, dangerNotification } from "notificationStore";
import { USER_ID } from "appConstants";

export function* deleteBoard(action) {
  const { payload: { params } = {} } = action;

  try {
    yield deleteBoardApi(params);
    yield put(boardDeletionSucceeded());
    yield put(fetchBoardList());
    yield successNotification("Board deleted successfully!")
    yield put(fetchBoardList({user_id: USER_ID}));
  } catch (errorResponse) {
    const { errors, message } = errorResponse;
    // const errorsShown = getFormErrors(errors, message);
    yield dangerNotification(message)
    
    yield put(boardDeletionFailed(errors));
  }
}

export function* deleteBoardSaga() {
  yield takeLatest(boardActions.boardDeletionInitiated, deleteBoard);
}

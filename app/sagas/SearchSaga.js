import {put, takeLatest, call, all} from 'redux-saga/effects'
import {connectToNetworkFailed} from "../actions";

// function* functionName() {
//   try {
//     const response = yield call(Api.someApi);
//     yield put(doSomething());
//   } catch (e) {
//     yield put(connectToNetworkFailed())
//   }
// }

export function* SearchSaga() {
	// yield all([
	//   takeLatest(actionName, functionName)
	// ]);
}

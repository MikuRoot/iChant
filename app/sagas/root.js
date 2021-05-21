import {all, fork} from "redux-saga/effects";
import {FavoriteSaga} from "./FavoriteSaga";
import {HomeSaga} from "./HomeSaga";
import {SearchSaga} from "./SearchSaga";
import {SettingSaga} from "./SettingSaga";

export default function* rootSaga() {
  yield all([
    fork(FavoriteSaga),
    fork(HomeSaga),
    fork(SearchSaga),
    fork(SettingSaga),
  ])
}

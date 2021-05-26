import {combineReducers} from "redux";
import {HomeReducer} from "./HomeReducer";
import {FavoriteReducer} from "./FavoriteReducer";
import {SearchReducer} from "./SearchReducer";
import {SettingReducer} from "./SettingReducer";

export const appReducers = combineReducers({
	HomeReducer: HomeReducer,
	FavoriteReducer: FavoriteReducer,
	SearchReducer: SearchReducer,
	SettingReducer: SettingReducer,
});

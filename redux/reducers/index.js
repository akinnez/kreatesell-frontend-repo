import { combineReducers } from "redux";
import auth from "./auth.reducer";
import store from "./store.reducer";
import utils from "./utils.reducer";

const rootReducer = combineReducers({
	auth,
	store,
	utils,
});

export default rootReducer;

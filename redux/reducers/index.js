import { combineReducers } from "redux";
import auth from "./auth.reducer";
import store from "./store.reducer";
import utils from "./utils.reducer";
import product from "./product.reducer";

const rootReducer = combineReducers({
	auth,
	store,
	utils,
	product,
});

export default rootReducer;

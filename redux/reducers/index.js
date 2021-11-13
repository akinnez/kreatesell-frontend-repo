import { combineReducers } from "redux";
import auth from "./auth.reducer";
import checkout from "./checkout.reducer";
import domain from "./domain.reducer";
import store from "./store.reducer";
import utils from "./utils.reducer";
import product from "./product.reducer";
import notification from "./notification.reducer";

const rootReducer = combineReducers({
	auth,
	checkout,
	domain,
	store,
	utils,
	product,
	notification,
});

export default rootReducer;

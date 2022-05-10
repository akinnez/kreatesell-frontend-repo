import { combineReducers } from "redux";
import auth from "./auth.reducer";
import checkout from "./checkout.reducer";
import domain from "./domain.reducer";
import store from "./store.reducer";
import utils from "./utils.reducer";
import product from "./product.reducer";
import notification from "./notification.reducer";
import affiliate from "./affiliate.reducer";
import coupon from './coupon.reducer'
const rootReducer = combineReducers({
  auth,
  checkout,
  coupon,
  domain,
  store,
  utils,
  product,
  notification,
  affiliate,
});

export default rootReducer;

import * as types from "../types/abandonedCart.types";

const initialState = {
  campaign: null,
};

const affiliate = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_CAMPAIGN:
      return { campaign: payload };

    default:
      return state;
  }
};

export default affiliate;

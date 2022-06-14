import * as types from "../types/abandonedCart.types";

export const setCampaign = campaign => ({
  type: types.SET_CAMPAIGN,
  payload: campaign,
});

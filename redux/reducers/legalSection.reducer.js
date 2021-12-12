import * as types from "../types";

const initialState = {
  activeTabKey: "1",
  isLinkClicked:false,
};

const legalSectionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.COOKIES_POLICY:
      return {
        ...state,
        activeTabKey: "1",
        isLinkClicked:true,
      };
    case types.PRIVACY_POLICY:
      return {
        ...state,
        activeTabKey: "2",
        isLinkClicked:true,
      };
    case types.TERMS_OF_SERVICE:
      return {
        ...state,
        activeTabKey: "3",
        isLinkClicked:true,
      };
    case types.AFFILIATE_TERMS:
      return {
        ...state,
        activeTabKey: "4",
        isLinkClicked:true,
      };
    case types.TAB_CLICK:
      return {
        ...state,
        activeTabKey: payload,
        isLinkClicked:false,
      };
    default:
      return state;
  }
};

export default legalSectionReducer;

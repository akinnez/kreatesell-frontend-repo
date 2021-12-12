import * as types from "../types";

export const showCookiesPolicyTab = () => {
  return { type: types.COOKIES_POLICY };
};

export const showPrivacyPolicyTab = () => {
  return { type: types.PRIVACY_POLICY };
};

export const showTermsOfServiceTab = () => {
  return { type: types.TERMS_OF_SERVICE };
};

export const showAffiliateTermsTab = () => {
  return { type: types.AFFILIATE_TERMS };
};

export const handleTabClick = (payload) => {
  return { type: types.TAB_CLICK, payload: payload };
};

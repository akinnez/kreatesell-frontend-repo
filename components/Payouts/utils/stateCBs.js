import { isAnEmpytyObject } from "utils";

export const paypalCB = bankDetails => {
  if (
    bankDetails &&
    bankDetails.country_id !== "1" &&
    bankDetails.country_id !== "72"
  ) {
    return true;
  }

  return false;
};

export const banksCB = (bankDetails, banksByCountryId) => {
  if (bankDetails && !isAnEmpytyObject(banksByCountryId)) {
    return banksByCountryId[bankDetails.country_id];
  }

  return [];
};

export const getBank = (banks, id) => banks.find(bank => bank.id === id);

export const getCountry = (countries, id) => {
  return countries.find(country => country.id === id);
};

import axios from "axios";
import { isAnEmpytyObject, showToast } from "utils";
import { bankSuccess, updateStore } from "redux/actions";
import axiosApi from "utils/axios";

export const isValidCB = bankDetails => {
  if (bankDetails) return true;

  return false;
};

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

export const createAccount = ({
  data,
  hideModal,
  showSuccessModal,
  dispatchObj,
  dispatch,
}) => {
  axiosApi.request(
    "post",
    `${process.env.BASE_URL}v1/kreatesell/payment/bank-details`,
    res => {
      dispatch(updateStore(dispatchObj));
      hideModal();
      showSuccessModal ? showSuccessModal() : showToast(res.message, "success");
    },
    err => {
      showToast(err.message, "error");
      hideModal();
    },
    data
  );
};

export const countryHandler = async ({
  value,
  formik,
  setPaypal,
  banksByCountryId,
  setBanks,
  setBanksLoading,
  dispatch,
}) => {
  formik.setFieldValue("country", value);

  if (value === 1 || value === 72) {
    setPaypal(false);

    if (value in banksByCountryId) {
      setBanks(banksByCountryId[value]);
    } else {
      setBanksLoading(true);

      const banksResponse = await axios.get(
        `${process.env.BASE_URL}v1/kreatesell/utils/get-banks/${value}`
      );

      const banksData = banksResponse.data.list_of_banks;

      setBanks(banksData);
      dispatch(bankSuccess({ id: value, banks: banksData }));
      setBanksLoading(false);
    }
  } else {
    setPaypal(true);
  }
};

export const bankHandler = (value, formik) => {
  formik.setFieldValue("bank", value);
};

export const accountNumberHandler = (e, formik, form) => {
  const { value } = e.target;

  const index = value.length - 1;
  const lastCharacter = value.charAt(index);

  if (!/\d/.test(lastCharacter)) {
    const characters = value.slice(0, value.length - 1);

    form.setFieldsValue({ account_number: characters });
    formik.setFieldValue("account_number", characters);
    return;
  }

  formik.handleChange(e);
};

export const validateAccountOnBlur = ({
  e,
  formik,
  form,
  banks,
  setValidating,
  setIsValid,
}) => {
  formik.handleBlur(e);

  const bankId = formik.values.bank;
  const accountNumber = formik.values.account_number.trim();

  if (!accountNumber || !bankId) return;

  const bank = getBank(banks, bankId);

  setValidating(true);
  setIsValid(true);

  axiosApi.request(
    "post",
    `${process.env.BASE_URL}v1/kreatesell/payment/validate-account`,
    res => {
      setValidating(false);

      if (res.status === "error") {
        showToast(res.message, "warn");
        setIsValid(false);
        return;
      }

      formik.setFieldValue("account_name", res.data.account_name);
      form.setFieldsValue({ account_name: res.data.account_name });
    },
    () => {
      setValidating(false);
      setIsValid(false);
      showToast("Unable to verify bank account number", "error");
    },
    {
      account_number: accountNumber,
      account_bank: bank.bank_code,
    }
  );
};

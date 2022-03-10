import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { bankSuccess, countriesRequest, countriesSuccess } from "redux/actions";
import { isAnEmpytyObject } from "utils";

const useFetchUtilities = () => {
  const { store, utils } = useSelector(state => state);
  const { bank_details: bankDetails } = store.store;
  const { countries: storeCountries } = utils;

  const dispatch = useDispatch();

  const countriesIsEmpty = storeCountries.length === 0;
  const hasBankDetails = !isAnEmpytyObject(store.store) && bankDetails;

  useEffect(() => {
    if (countriesIsEmpty) {
      const fetcher = async () => {
        dispatch(countriesRequest());

        const getCountries = axios.get(
          `${process.env.BASE_URL}v1/kreatesell/utils/get-countries`
        );

        const getCountriesWithFlag = axios.get(
          "https://restcountries.com/v3.1/all"
        );

        const [countriesResponse, countriesWithFlagResponse] =
          await Promise.all([getCountries, getCountriesWithFlag]);

        const countryFlags = countriesWithFlagResponse.data.reduce(
          (acc, curr) => {
            acc[curr.cca2] = curr.flags.png;
            return acc;
          },
          {}
        );

        const countries = countriesResponse.data.list_of_countries
          .filter(country => country.name !== "Netherlands Antilles")
          .map(country => {
            if (country.short_name in countryFlags) {
              country.flag = countryFlags[country.short_name];
              return country;
            }

            return country;
          });

        dispatch(countriesSuccess(countries));
      };

      fetcher();
    }
  }, [dispatch, countriesIsEmpty]);

  useEffect(() => {
    if (hasBankDetails) {
      const id = bankDetails.country_id;

      axios
        .get(`${process.env.BASE_URL}v1/kreatesell/utils/get-banks/${id}`)
        .then(res => {
          const banksData = res.data.list_of_banks;
          dispatch(bankSuccess({ id, banks: banksData }));
        });
    }
  }, [bankDetails, dispatch, hasBankDetails]);
};

export default useFetchUtilities;

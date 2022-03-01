import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { countriesRequest, countriesSuccess } from "redux/actions";

const useFetchUtilities = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetcher = async () => {
      dispatch(countriesRequest());

      const getCountries = axios.get(
        `${process.env.BASE_URL}v1/kreatesell/utils/get-countries`
      );

      const getCountriesWithFlag = axios.get(
        "https://restcountries.com/v3.1/all"
      );

      const [countriesResponse, countriesWithFlagResponse] = await Promise.all([
        getCountries,
        getCountriesWithFlag,
      ]);

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
  }, [dispatch]);
};

export default useFetchUtilities;

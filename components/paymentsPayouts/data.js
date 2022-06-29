import {
  NgFlag,
  UsFlag,
  UkFlag,
  GhFlag,
  KenFlag,
  UganFlag,
  SouthAfricanFlag,
  LiberianFlag,
  TanzanianFlag,
  LeoneFlag,
  MalawiFlag,
  BeninFlag,
  GambianFlag,
  IvoryCoastFlag,
  TogoFlag,
  SenegalFlag,
  MaliFlag,
  BurnkinaFasoFlag,
  ChadFlag,
  GabonFlag,
  CamFlag,
} from "utils";

export { GabonFlag as Flag };

export const data = [
  { currency: "NGN", country: "Nigeria", flag: NgFlag?.src },
  { currency: "USD", country: "USA", flag: UsFlag?.src },
  {
    currency: "GBP",
    country: "United kingdom",
    flag: UkFlag?.src,
    fullWidth: true,
  },
  { currency: "GHS", country: "Ghana", flag: GhFlag?.src },
  { currency: "KES", country: "Kenya", flag: KenFlag?.src },
  { currency: "UGX", country: "Uganda", flag: UganFlag?.src },
  {
    currency: "ZAR",
    country: "South Africa",
    flag: SouthAfricanFlag?.src,
    fullWidth: true,
  },
  {
    currency: "XOF",
    country: "Burkina Faso",
    flag: BurnkinaFasoFlag?.src,
    fullWidth: true,
  },
  // dummy here
  { currency: "DUMMY-1", country: "Liberia", flag: LiberianFlag?.src },
  { currency: "TZS", country: "Tanzania", flag: TanzanianFlag?.src },
  {
    currency: "SLL",
    country: "Sierra Leone",
    flag: LeoneFlag?.src,
    fullWidth: true,
  },
  { currency: "DUMMY-2", country: "Malawi", flag: MalawiFlag?.src },
  {
    currency: "DUMMY-3",
    country: "Benin Republic",
    flag: BeninFlag?.src,
    fullWidth: true,
  },
  { currency: "DUMMY-4", country: "Gambia", flag: GambianFlag?.src },
  {
    currency: "XOF",
    country: "Ivory Coast",
    flag: IvoryCoastFlag?.src,
    fullWidth: true,
  },
  { currency: "DUMMY-4", country: "Togo", flag: TogoFlag?.src },
  { currency: "XOF", country: "Senegal", flag: SenegalFlag?.src },
  { currency: "XOF", country: "Mali", flag: MaliFlag?.src },
  { currency: "DUMMY-5", country: "Chad", flag: ChadFlag?.src },
  { currency: "XOF", country: "Cameroon", flag: CamFlag?.src },
  { currency: "DUMMY-6", country: "Gabon", flag: GabonFlag?.src },
];

export const selectCountry = data.map((item) => ({
  label: item?.country,
  value: item?.country,
  flag: item?.flag,
}));

export const selectCurrency = data.map((item) => ({
  label: item?.currency,
  // value: `${item?.country}:${item?.currency}`,
  value: item?.currency,
  flag: item?.flag,
}));

// CUSTOM FUNCTION TO RETURN CURRENCY TIME
const customCurrency = (country, currency) => {
  return `${country}-${currency}`;
};

export const getWaitTime = (country, currency) => {
  let time;
  let customCurrencyVal = `${country}-${currency}`;

  // SWITCH
  switch (customCurrencyVal) {
    case customCurrency("Nigeria", "NGN"):
      time = 1;
      break;
    case customCurrency("Nigeria", "USD"):
      time = 10;

      break;
    case customCurrency("Nigeria", "KES"):
      time = 5;
      break;
    case customCurrency("Kenya", "KES"):
      time = 1;
      break;
    case customCurrency("Kenya", "NGN"):
      time = 5;
      break;
    // case country === "Kenya" && currency === "USD":
    //   time = 5;
    //   break;
    default:
      console.log("no matching conditions");
      return (time = 1);
  }
  return time;
};

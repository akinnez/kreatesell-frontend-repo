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
  { currency: "", country: "Liberia", flag: LiberianFlag?.src },
  { currency: "TZS", country: "Tanzania", flag: TanzanianFlag?.src },
  {
    currency: "SLL",
    country: "Sierra Leone",
    flag: LeoneFlag?.src,
    fullWidth: true,
  },
  { currency: "", country: "Malawi", flag: MalawiFlag?.src },
  {
    currency: "",
    country: "Benin Republic",
    flag: BeninFlag?.src,
    fullWidth: true,
  },
  { currency: "", country: "Gambia", flag: GambianFlag?.src },
  {
    currency: "XOF",
    country: "Ivory Coast",
    flag: IvoryCoastFlag?.src,
    fullWidth: true,
  },
  { currency: "", country: "Togo", flag: TogoFlag?.src },
  { currency: "XOF", country: "Senegal", flag: SenegalFlag?.src },
  { currency: "XOF", country: "Mali", flag: MaliFlag?.src },
  { currency: "", country: "Chad", flag: ChadFlag?.src },
  { currency: "XOF", country: "Cameroon", flag: CamFlag?.src },
  { currency: "", country: "Gabon", flag: GabonFlag?.src },
];

export const selectCountry = data.map((item) => ({
  label: item?.country,
  value: item?.country,
  flag: item?.flag,
}));

const allCurrencies = data.map((item) => ({
  label: item?.currency,
  // value: `${item?.country}:${item?.currency}`,
  value: item?.currency,
  flag: item?.flag,
}));

export const selectCurrency = allCurrencies
  .filter((item) => item.value !== "")
  .slice(0, 10);

// CUSTOM FUNCTION TO RETURN countryAndCURRENCY
const customCurrency = (country, currency) => {
  return `${country}-${currency}`;
};

// custom function to return wait time.
export const getWaitTime = (country, currency) => {
  let time;
  let customCurrencyVal = `${country}-${currency}`;

  // SWITCH
  switch (customCurrencyVal) {
    // country set at Nigeria and currency changed.
    case customCurrency("Nigeria", "NGN"):
      time = 1;
      break;
    case customCurrency("Nigeria", "USD"):
    case customCurrency("Nigeria", "GBP"):
      time = 10;
      break;

    // Kenya:
    case customCurrency("Kenya", "NGN"):
    case customCurrency("Kenya", "KES"):
      time = 1;
      break;
    case customCurrency("Kenya", "USD"):
    case customCurrency("Kenya", "GBP"):
      time = 10;
      break;

    // Ghana:
    case customCurrency("Ghana", "NGN"):
    case customCurrency("Ghana", "GHS"):
      time = 1;
      break;
    case customCurrency("Ghana", "USD"):
    case customCurrency("Ghana", "GBP"):
      time = 10;
      break;

    //Tanzania

    case customCurrency("Tanzania", "NGN"):
      time = 1;
      break;
    case customCurrency("Tanzania", "USD"):
    case customCurrency("Tanzania", "GBP"):
      time = 10;
      break;
    // Uganda
    case customCurrency("Uganda", "NGN"):
    case customCurrency("Uganda", "UGX"):
      time = 1;
      break;
    case customCurrency("Uganda", "USD"):
    case customCurrency("Uganda", "GBP"):
      time = 10;
      break;

    //South africa:
    case customCurrency("South Africa", "NGN"):
    case customCurrency("South Africa", "ZAR"):
      time = 1;
      break;
    case customCurrency("South Africa", "USD"):
    case customCurrency("South Africa", "GBP"):
      time = 10;
      break;

    // Seirra Leone
    case customCurrency("Sierra Leone", "NGN"):
    case customCurrency("Sierra Leone", "SLL"):
      time = 1;
      break;
    case customCurrency("Sierra Leone", "USD"):
    case customCurrency("Sierra Leone", "GBP"):
      time = 10;
      break;

    // senegal
    case customCurrency("Senegal", "NGN"):
      time = 1;
      break;
    case customCurrency("Senegal", "USD"):
    case customCurrency("Senegal", "GBP"):
      time = 10;
      break;

    // burkina faso
    case customCurrency("Burkina Faso", "NGN"):
      time = 1;
      break;
    case customCurrency("Burkina Faso", "USD"):
    case customCurrency("Burkina Faso", "GBP"):
      time = 10;
      break;

    // IVORY COAST:
    case customCurrency("Ivory Coast", "NGN"):
      time = 1;
      break;
    case customCurrency("Ivory Coast", "USD"):
    case customCurrency("Ivory Coast", "GBP"):
      time = 10;
      break;

    // Mali

    // default case:
    case customCurrency("Mali", "NGN"):
      time = 1;
      break;
    case customCurrency("Mali", "USD"):
    case customCurrency("Mali", "GBP"):
      time = 10;
      break;

    // Cameroon
    case customCurrency("Cameroon", "NGN"):
      time = 1;
      break;
    case customCurrency("Cameroon", "USD"):
    case customCurrency("Cameroon", "GBP"):
      time = 10;
      break;

    // liberia
    case customCurrency("Liberia", "NGN"):
      time = 1;
      break;
    case customCurrency("Liberia", "USD"):
    case customCurrency("Liberia", "GBP"):
      time = 10;
      break;

    // BENIN REPUBLIC;
    case customCurrency("Benin Republic", "NGN"):
      time = 1;
      break;
    case customCurrency("Benin Republic", "USD"):
    case customCurrency("Benin Republic", "GBP"):
      time = 10;
      break;

    // MALAWI:
    case customCurrency("Malawi", "NGN"):
      time = 1;
      break;
    case customCurrency("Malawi", "USD"):
    case customCurrency("Malawi", "GBP"):
      time = 10;
      break;

    // GAMBIA
    case customCurrency("Gambia", "NGN"):
      time = 1;
      break;
    case customCurrency("Gambia", "USD"):
    case customCurrency("Gambia", "GBP"):
      time = 10;
      break;

    //TOGO
    case customCurrency("Togo", "NGN"):
      time = 1;
      break;
    case customCurrency("Togo", "USD"):
    case customCurrency("Togo", "GBP"):
      time = 10;
      break;

    // CHAD
    case customCurrency("Chad", "NGN"):
      time = 1;
      break;
    case customCurrency("Chad", "USD"):
    case customCurrency("Chad", "GBP"):
      time = 10;
      break;

    // GABON
    case customCurrency("Gabon", "NGN"):
      time = 1;
      break;
    case customCurrency("Gabon", "USD"):
    case customCurrency("Gabon", "GBP"):
      time = 10;
      break;

    // USA OR UK set as country and whatever currency
    case customCurrency("USA", currency):
    case customCurrency("United kingdom", currency):
      time = 10;
      break;
    // DEFAULT
    default:
      //  FOR ALL OTHERS RETURN 5
      return (time = 5);
  }
  return time;
};

export const getFee = (currency, amount) => {
  let rate;
  switch (currency) {
    case "NGN":
      rate = 5;
      break;
    case "USD":
    case "GBP":
      rate = 10;
      break;
    // for whatever other currency passed in
    case currency:
      rate = 6;
      break;
    default:
      rate = 5;
      break;
  }
  return {
    rate,
    fee: (rate * amount) / 100,
  };
};

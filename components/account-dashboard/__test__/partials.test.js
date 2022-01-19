import {
  dayOptions,
  currencyOptions,
  affiliateOptions,
  kreatorsOptions,
} from "../partials";

describe("Get data from partial", () => {
  test("dayOptions data snapshots ", () => {
    expect(dayOptions).toMatchSnapshot();
  });

  test("currencyOptions data snapshots", () => {
    expect(currencyOptions).toMatchSnapshot();
  });
  test("affiliateOptions data snapshots", () => {
    expect(affiliateOptions).toMatchSnapshot();
  });
  test("kreatorsOptions data snapshots", () => {
    expect(kreatorsOptions).toMatchSnapshot();
  });
});

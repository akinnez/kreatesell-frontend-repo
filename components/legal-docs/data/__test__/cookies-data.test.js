import { cookieData } from "../cookie-policy";

it("renders a snapshot of the data for the cookie-policy page", () => {
  expect(cookieData).toMatchSnapshot();
});

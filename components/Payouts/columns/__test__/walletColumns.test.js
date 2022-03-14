import { walletColumns } from "../walletColumns";

it("renders a snapshot of walletColumns data", () => {
  expect(walletColumns).toMatchSnapshot();
});

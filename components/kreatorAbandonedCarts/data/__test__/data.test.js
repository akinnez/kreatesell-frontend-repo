import { abandonedCartsMails } from "..";

it("renders a snapshot of the abandonedCartsMails data", () => {
  expect(abandonedCartsMails).toMatchSnapshot();
});

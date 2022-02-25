import productColumns from "..";

it("renders a snapshot of productColumns data", () => {
  expect(productColumns()).toMatchSnapshot();
});

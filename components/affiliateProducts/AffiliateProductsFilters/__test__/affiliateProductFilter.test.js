import AffiliateProductFilter from "..";
import renderer from "react-test-renderer";
import { mockData } from "./data";

const mockProps = {
  data: mockData,
  setFiltered: jest.fn(),
};
it("renders a snapshot of <AffiliateProductFilter />", () => {
  const filter = renderer
    .create(<AffiliateProductFilter {...mockProps} />)
    .toJSON();

  expect(filter).toMatchSnapshot();
});

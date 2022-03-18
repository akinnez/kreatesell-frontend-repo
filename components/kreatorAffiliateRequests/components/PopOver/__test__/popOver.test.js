import PopOver from "..";
import renderer from "react-test-renderer";

const mockProps = {
  showReportModal: jest.fn(),
  record: {
    affiliate_name: "mock name",
    reported: true,
    affiliateId: "1",
  },
};

it("renders a snapshot of <PopOver /> ", () => {
  const el = renderer.create(<PopOver {...mockProps} />).toJSON();
  expect(el).toMatchSnapshot();
});

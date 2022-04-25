import renderer from "react-test-renderer";
import MembershipTab from "../MembershipTab";

const setActiveTab = jest.fn();

it("renders a snapshot of <MembershipTab />", () => {
  const tabs = renderer.create(
    <MembershipTab setIsTabsActive={setActiveTab} />
  );

  expect(tabs).toMatchSnapshot();
});

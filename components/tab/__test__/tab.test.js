import Tabs, { TabItem } from "../index";
import renderer from "react-test-renderer";

const MockChild = () => <div>mock tabItem child</div>;
const mockTitles = ["mockTitle1", "mockTitle2", "mockTitle3"];
const handleSelect = jest.fn();

describe("TabItem : ", () => {
  it("renders a snapshot of <TabItem />", () => {
    const tabItem = renderer
      .create(
        <TabItem>
          <MockChild />
        </TabItem>
      )
      .toJSON();
    expect(tabItem).toMatchSnapshot();
  });
});

describe("Tabs : ", () => {
  it("renders a snapshot of <Tabs /> WITH no props", () => {
    const tab = renderer
      .create(
        <Tabs>
          <MockChild />
        </Tabs>
      )
      .toJSON();
    expect(tab).toMatchSnapshot();
  });

  it("renders a snapshot of <Tabs /> WITH mock props", () => {
    const tab = renderer
      .create(
        <Tabs title={mockTitles} onSelect={handleSelect}>
          <MockChild />
        </Tabs>
      )
      .toJSON();
    expect(tab).toMatchSnapshot();
  });
});

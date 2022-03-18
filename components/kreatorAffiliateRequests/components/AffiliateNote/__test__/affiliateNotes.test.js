import AffiliateNote from "..";
import EnzymeToJson from "enzyme-to-json";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

const mockProps = {
  hideNotes: jest.fn(),
  affiliateNote: "mockNote",
};

describe("AffiliateNote: ", () => {
  it("renders a snapshot of <AffiliateNote /> when notes is false", () => {
    const el = mount(<AffiliateNote notes={false} {...mockProps} />);

    expect(EnzymeToJson(el)).toMatchSnapshot();
  });
  it("renders a snapshot of <AffiliateNote /> when notes is true", () => {
    const el = mount(<AffiliateNote notes={true} {...mockProps} />);

    expect(EnzymeToJson(el)).toMatchSnapshot();
  });
});

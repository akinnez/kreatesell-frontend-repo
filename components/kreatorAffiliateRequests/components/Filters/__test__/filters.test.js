import Filters from "..";
import EnzymeToJson from "enzyme-to-json";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

const mockProps = {
  setProductName: jest.fn(),
  setAffiliateName: jest.fn(),
  setProductType: jest.fn(),
  setRequestDate: jest.fn(),
};

it("renders a snapshot of <Filters /> when notes is false", () => {
  const el = mount(<Filters {...mockProps} />);
  expect(EnzymeToJson(el)).toMatchSnapshot();
});

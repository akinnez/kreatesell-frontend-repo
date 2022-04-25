import ProductEditor from "../ProductEditor";
import EnzymeToJson from "enzyme-to-json";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

const mockProps = {
  content: "mockContent",
  setContent: jest.fn(),
};

it("renders a snapshot of <ProductEditor /> with mock props", () => {
  const editor = mount(<ProductEditor {...mockProps} />).toJSON();
  expect(EnzymeToJson(editor)).toMatchSnapshot();
});

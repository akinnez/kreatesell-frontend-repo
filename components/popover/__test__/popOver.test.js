import { Popover } from "../Popover";
import toJson from "enzyme-to-json";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

const mockProps = {
  content: "mock content",
  triggerButton: "triggerBtn?",
  title: "mockTitle",
  placement: "bottom",
  visible: true,
  width: "100",
};

it("renders a snapshot of <Popover /> with mock props", () => {
  const popOver = mount(<Popover {...mockProps} />);
  expect(toJson(popOver)).toMatchSnapshot();
});

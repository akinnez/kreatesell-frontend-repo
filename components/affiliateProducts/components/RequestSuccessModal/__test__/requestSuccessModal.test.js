import RequestSuccessModal from "..";
import toJson from "enzyme-to-json";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

const mockProp = {
  handleHideModal: jest.fn(),
};

it("renders a snapshot of <RequestSuccessModal when showModal is false />", () => {
  const modal = mount(<RequestSuccessModal showModal={false} {...mockProp} />);
  expect(toJson(modal)).toMatchSnapshot();
});

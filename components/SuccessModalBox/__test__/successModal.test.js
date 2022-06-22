import EnzymeToJson from "enzyme-to-json";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import SuccessModal from "..";

configure({ adapter: new Adapter() });

const mockProps = {
  closeModal: jest.fn(),
  closeButton: true,
  closable: true,
  modalIsVisible: false,
  children: <>Mock children</>,
};

it("renders a snapshot of <SuccessModal /> with mock props ", () => {
  const modal = mount(<SuccessModal {...mockProps} />);
  expect(EnzymeToJson(modal)).toMatchSnapshot();
});

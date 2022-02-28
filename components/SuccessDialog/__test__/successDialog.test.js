import SuccessDialog from "..";
import EnzymeToJson from "enzyme-to-json";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

const mockProps = {
  content: "mock content",
  handleSuccess: jest.fn(),
  handleFailure: jest.fn(),
  successBtnText: "success",
  failureBtnText: "failure",
};

describe("SuccessDialog : ", () => {
  it("renders a snapshot of <SuccessDialog /> when visible is  true", () => {
    const el = mount(<SuccessDialog {...mockProps} visible={true} />);
    expect(EnzymeToJson(el)).toMatchSnapshot();
  });
  it("renders a snapshot of <SuccessDialog /> when visible is false", () => {
    const el = mount(<SuccessDialog {...mockProps} visible={false} />);
    expect(EnzymeToJson(el)).toMatchSnapshot();
  });
});

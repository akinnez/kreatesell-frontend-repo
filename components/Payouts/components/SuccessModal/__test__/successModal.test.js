import SuccessModal from "..";
import EnzymeToJson from "enzyme-to-json";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

const mockProps = {
  hideModal: jest.fn(),
  closable: true,
};

describe("SuccessModal: ", () => {
  it("renders a snapshot of <SuccessModal /> when successModal is false", () => {
    const el = mount(
      <SuccessModal {...mockProps} successModal={false}>
        mock child
      </SuccessModal>
    );
    expect(EnzymeToJson(el)).toMatchSnapshot();
  });
  //   it("renders a snapshot of <SuccessModal /> when successModal is true", () => {
  //     const el = mount(
  //       <SuccessModal {...mockProps} successModal={true}>
  //         mock child
  //       </SuccessModal>
  //     );
  //     expect(EnzymeToJson(el)).toMatchSnapshot();
  //   });
});

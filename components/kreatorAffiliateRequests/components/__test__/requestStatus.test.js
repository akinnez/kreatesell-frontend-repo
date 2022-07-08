import RequestStatus from "../RequestStatus";
import renderer from "react-test-renderer";

describe("RequestStatus : ", () => {
  it("renders a snapshot of <RequestStatus /> when status is Approved", () => {
    const status = renderer
      .create(<RequestStatus status="Approved" />)
      .toJSON();
    expect(status).toMatchSnapshot();
  });
  it("renders a snapshot of <RequestStatus /> when status is Pending ", () => {
    const status = renderer.create(<RequestStatus status="Pending" />).toJSON();
    expect(status).toMatchSnapshot();
  });
  it("renders a snapshot of <RequestStatus /> when status is Declined ", () => {
    const status = renderer
      .create(<RequestStatus status="Declined" />)
      .toJSON();
    expect(status).toMatchSnapshot();
  });
});

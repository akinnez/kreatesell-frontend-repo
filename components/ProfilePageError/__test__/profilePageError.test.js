import ProfilePageError from "..";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { initializeStore } from "../../../redux/store";
import * as nextRouter from "next/router";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));

const mockProps = {
  errorMsg: "Error Message",
  title: "title",
};

const mockState = {
  auth: "",
  domain: "",
  store: {
    store: { bank_details: "" },
  },
  utils: "",
  product: "",
};
describe("ProfilePageError : ", () => {
  it("renders a snapshot of <ProfilePageError /> when showBackBtn is true", () => {
    const pageError = renderer
      .create(
        <Provider store={initializeStore(mockState)}>
          <ProfilePageError {...mockProps} showBackBtn={true} />
        </Provider>
      )
      .toJSON();
    expect(pageError).toMatchSnapshot();
  });
  it("renders a snapshot of <ProfilePageError /> when showBackBtn is false", () => {
    const pageError = renderer
      .create(
        <Provider store={initializeStore(mockState)}>
          <ProfilePageError {...mockProps} showBackBtn={false} />
        </Provider>
      )
      .toJSON();
    expect(pageError).toMatchSnapshot();
  });
});

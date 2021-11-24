import renderer from "react-test-renderer";
import * as nextRouter from "next/router";
import { Provider } from "react-redux";
import { initializeStore } from "../../../../redux/store";
import { ProtectedStoreHeader, StoreHeader } from "../index";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  route: "/",
}));
const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

describe("ProtectedStoreHeader : ", () => {
  it("renders a snapshot of <ProtectedStoreHeader /> with no props", () => {
    const protectedStoreHeader = renderer
      .create(
        <Provider store={initializeStore(mockState)}>
          <ProtectedStoreHeader />
        </Provider>
      )
      .toJSON();
    expect(protectedStoreHeader).toMatchSnapshot();
  });
});

describe("StoreHeader : ", () => {
  it("renders a snapshot of <StoreHeader />", () => {
    const storeHeader = renderer.create(<StoreHeader />).toJSON();
    expect(storeHeader).toMatchSnapshot();
  });
});

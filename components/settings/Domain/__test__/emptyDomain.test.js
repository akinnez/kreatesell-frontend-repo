import { EmptyDomain } from "../EmptyDomain";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { initializeStore } from "../../../../redux/store";

const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

describe("EmptyDomain : ", () => {
  it("renders a snapshot of <EmptyDomain /> WITH showHeader at false", () => {
    const emptyDomain = renderer
      .create(
        <Provider store={initializeStore(mockState)}>
          <EmptyDomain showHeader={false} />
        </Provider>
      )
      .toJSON();
    expect(emptyDomain).toMatchSnapshot();
  });

  it("renders a snapshot of <EmptyDomain /> WITH showHeader at true", () => {
    const emptyDomain = renderer
      .create(
        <Provider store={initializeStore(mockState)}>
          <EmptyDomain showHeader={true} />
        </Provider>
      )
      .toJSON();
    expect(emptyDomain).toMatchSnapshot();
  });
});

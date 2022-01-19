import renderer from "react-test-renderer";
import { Layout } from "../Layout";
import * as nextRouter from "next/router";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));
const MockChildren = () => <div>mock Child</div>;

describe("Layout: ", () => {
  it("renders a snapshot of <Layout />", () => {
    const layout = renderer
      .create(
        <Layout>
          <MockChildren />
        </Layout>
      )
      .toJSON();
    expect(layout).toMatchSnapshot();
  });
  it("renders a snapshot of <Layout /> with mock props", () => {
    const layout = renderer
      .create(
        <Layout
          title="mockTitle"
          keywords="mock keywords"
          description="This is a mock description"
          subFooter={false}
          defaultMarginTop={true}
        >
          <MockChildren />
        </Layout>
      )
      .toJSON();
    expect(layout).toMatchSnapshot();
  });
  it("renders a snapshot of <Layout /> with mock props and subFooter = true and defaultMarginTop = false ", () => {
    const layout = renderer
      .create(
        <Layout
          title="mockTitle"
          keywords="mock keywords"
          description="This is a mock description"
          subFooter={true}
          defaultMarginTop={false}
        >
          <MockChildren />
        </Layout>
      )
      .toJSON();
    expect(layout).toMatchSnapshot();
  });
});

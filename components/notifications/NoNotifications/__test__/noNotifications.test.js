import renderer from "react-test-renderer";
import NoNotifications from "..";

it("renders a snapshot of <NoNotifications />", () => {
  const el = renderer
    .create(<NoNotifications width={70} height={70} />)
    .toJSON();
  expect(el).toMatchSnapshot();
});

import { Provider } from "react-redux";
import { initializeStore } from "../../../../../redux/store";
import Campaign from "..";
import renderer from "react-test-renderer";

const mockProps = {
  campaign: {
    email_subject: "mock subject",
    date_created: "9/8/2021",
    time_to_send: "12/7/2022",
  },
};

const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

it("renders a snapshot of <Campaign /> with mock props", () => {
  const campaign = renderer
    .create(
      <Provider store={initializeStore(mockState)}>
        <Campaign {...mockProps} />
      </Provider>
    )
    .toJSON();
  expect(campaign).toMatchSnapshot();
});

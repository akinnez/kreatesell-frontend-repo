import { ChargeBackTable } from "../ChargeBackTable";
import renderer from "react-test-renderer";

const mockProps = {
  data: [
    {
      id: 0,
      customer_email: "mockMail@x.com",
      customer_namer: "mockName",
      transaction_date: "2022-01-20 10:26:44",
      due_date: "2022-01-20 10:26:44",
      status: "Pending",
      product_type_details: "mockDetails",
      product_details: {
        selling_price: 0,
      },
    },
    {
      id: 1,
      customer_email: "mocksMail@x.com",
      customer_namer: "mosckName",
      transaction_date: "2022-01-20 10:26:43",
      due_date: "2022-01-20 10:26:44",
      status: "Won",
      product_type_details: "mockDetails",
      product_details: {
        selling_price: 0,
      },
    },
    {
      id: 2,
      customer_email: "moc2kMail@x.com",
      customer_namer: "mockName22",
      transaction_date: "2022-01-20 10:26:44",
      due_date: "2022-01-20 10:26:44",
      status: "Pending",
      product_type_details: "mockDetails",
      product_details: {
        selling_price: 0,
      },
    },
  ],
};

it("renders a snapshot of <ChargeBackTable /> with mock props", () => {
  const table = renderer.create(<ChargeBackTable {...mockProps} />).toJSON();
  expect(table).toMatchSnapshot();
});

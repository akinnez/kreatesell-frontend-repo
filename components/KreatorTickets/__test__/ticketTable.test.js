import { mockData } from "./Table.test";
import renderer from "react-test-renderer";
import TicketTable from "../TicketTable";

const handlePaginationChange = jest.fn();
const mockPageNo = 1;
it("renders a snapshot of <TicketTable />", () => {
  const ticketTable = renderer
    .create(
      <TicketTable
        page={mockPageNo}
        handlePaginationChange={handlePaginationChange}
        tickets={mockData}
      />
    )
    .toJSON();
  expect(ticketTable).toMatchSnapshot();
});

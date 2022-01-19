import renderer from "react-test-renderer";
import TicketTable from "../TicketTable";

const mockData = [
  {
    id: 1,
    heading: "mockHeading1",
    date: "2022-01-01 13:15:00",
    department: "technical",
    status: "active",
  },
  {
    id: 2,
    heading: "mockHeading2",
    date: "2022-01-01 13:15:00",
    department: "general",
    status: "pending",
  },
  {
    id: 3,
    heading: "mockHeading3",
    date: "2022-01-01 13:15:00",
    department: "billing",
    status: "answered",
  },
];

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

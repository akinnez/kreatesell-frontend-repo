import renderer from "react-test-renderer";
import { Table } from "../Table";

export const mockData = [
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

it("renders as snapshot of <Table /> using MOCK data", () => {
  const table = renderer.create(<Table data={mockData} />).toJSON();
  expect(table).toMatchSnapshot();
});

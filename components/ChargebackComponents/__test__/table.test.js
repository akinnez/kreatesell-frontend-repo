import { Table } from "../Table";
import renderer from "react-test-renderer";

const mockProps = {
  header: [
    { title: "mockHeader1" },
    { title: "mockHeader2" },
    { title: "mockHeader3" },
  ],
  data: [
    {
      id: 0,
      name: "mockName",
      desc: "mockDesc1",
      department: "mockDept1",
      status: "Open",
      date: "2022-01-20 10:26:44",
    },
    {
      id: 0,
      name: "mockName2",
      desc: "mockDesc2",
      department: "mockDept2",
      status: "Closed",
      date: "2022-01-20 10:26:44",
    },
    {
      id: 0,
      name: "mockName3",
      desc: "mockDesc3",
      department: "mockDept3",
      status: "Open",
      date: "2022-01-20 10:26:44",
    },
  ],
};

describe("Table : ", () => {
  it("renders a snapshot of <Table /> with mockProps when loading is false", () => {
    const table = renderer
      .create(<Table loading={false} {...mockProps} />)
      .toJSON();
    expect(table).toMatchSnapshot();
  });

  it("renders a snapshot of <Table /> with mockProps when loading is true", () => {
    const table = renderer
      .create(<Table loading={true} {...mockProps} />)
      .toJSON();
    expect(table).toMatchSnapshot();
  });
});

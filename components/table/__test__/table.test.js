import { Table } from "../Table";
import renderer from "react-test-renderer";

const mockHeaders = ["mockHeaderOne", "mockHeaderTwo", "mockHeaderThree"];
const mockData = ["data1", "data2", "data3"];

describe("Table : ", () => {
  it("renders a snapshot of <Table />", () => {
    const table = renderer
      .create(<Table data={mockData} header={mockHeaders} loading={false} />)
      .toJSON();
    expect(table).toMatchSnapshot();
  });

  it("renders a snapshot of <Table /> with no props", () => {
    const table = renderer.create(<Table />).toJSON();
    expect(table).toMatchSnapshot();
  });
});

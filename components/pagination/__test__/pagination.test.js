import renderer from "react-test-renderer";
import { Pagination } from "../Pagination";

const handlePageChange = jest.fn();

describe("Pagination : ", () => {
  it("renders a snapshot of <Pagination /> with mock props", () => {
    const pagination = renderer
      .create(<Pagination onPageChange={handlePageChange} />)
      .toJSON();
    expect(pagination).toMatchSnapshot();
  });

  it("renders a snapshot of <Pagination /> with mock props and mock values", () => {
    const pagination = renderer
      .create(
        <Pagination
          onPageChange={handlePageChange}
          totalCount={10}
          currentPage={1}
          pageSize={4}
        />
      )
      .toJSON();
    expect(pagination).toMatchSnapshot();
  });
});

import tableColumns from "..";

const mockParameters = {
  types: {
    id: {
      product_type_name: "mock ProductName",
    },
  },
  showNotesModal: jest.fn(),
  updateRequest: jest.fn(),
  showReportModal: jest.fn(),
};

const { types, showNotesModal, updateRequest, showReportModal } =
  mockParameters;
it("renders a snapshot of tableColumns data", () => {
  expect(
    tableColumns(types, showNotesModal, updateRequest, showReportModal)
  ).toMatchSnapshot();
});

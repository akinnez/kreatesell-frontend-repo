import MobileView from "..";
import renderer from "react-test-renderer";

const mockProps = {
  showNoteModal: jest.fn(),
  showActionModal: jest.fn(),
  showReportModal: jest.fn(),
  requests: [
    {
      id: 1,
      status: "approved",
      notes: ["*&", "^&$"],
      note_flag: "mock flag",
      affiliate_name: "mock affiliate",
      affiliate_id: "mock Id1",
      product_id: "mockId",
      request_date: "20/12/2011",
      affiliate_reported: "yourself",
      affiliate_profile_image: "mockImage",
      affiliate_unique_username: "mockUsername",
      product_name: "mock product name",
      product_type: "digital product",
      number_of_sales: 10,
    },
    {
      id: 2,
      status: "pending",
      notes: ["*&", "^&$"],
      note_flag: "mock flag2",
      affiliate_name: "mock affiliate2",
      affiliate_id: "mock Id2",
      product_id: "mockId2",
      request_date: "20/4/2011",
      affiliate_reported: "yourself2",
      affiliate_profile_image: "mockImage",
      affiliate_unique_username: "mockUsername",
      product_name: "mock product name",
      product_type: "digital product",
      number_of_sales: 100,
    },
    {
      id: 3,
      status: "declined",
      notes: ["*&", "^&$"],
      note_flag: "mock flag2",
      affiliate_name: "mock affiliate3",
      affiliate_id: "mock Id3",
      product_id: "mockId3",
      request_date: "10/9/2011",
      affiliate_reported: "yourself",
      affiliate_profile_image: "mockImage",
      affiliate_unique_username: "mockUsername",
      product_name: "mock product name",
      product_type: "digital product",
      number_of_sales: 30,
    },
  ],
};

describe("MobileView : ", () => {
  it("renders a snapshot of <MobileView /> with mock props with request overriden with an empty array", () => {
    const el = renderer
      .create(<MobileView {...mockProps} requests={[]} />)
      .toJSON();
    expect(el).toMatchSnapshot();
  });
  it("renders a snapshot of <MobileView /> with mock props with requests passed in with mock values", () => {
    const el = renderer.create(<MobileView {...mockProps} />).toJSON();
    expect(el).toMatchSnapshot();
  });
});

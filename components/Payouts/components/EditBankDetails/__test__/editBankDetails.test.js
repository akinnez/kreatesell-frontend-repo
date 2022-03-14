import EditBankDetails from "..";
import { Provider } from "react-redux";
import { initializeStore } from "redux/store";
import EnzymeToJson from "enzyme-to-json";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const mockState = {
  auth: "",
  domain: "",
  store: "",
  utils: {
    countries: ["Nigeria", "Uganda", "Ghana"],
    banksByCountryId: [],
    loading: false,
  },
  product: "",
};

const mockProps = {
  hideEditModal: jest.fn(),
  showSuccessModal: jest.fn(),
  bankDetails: {
    account_number: "02772727272",
    account_name: "Salvo Agency Intl",
    bank_name: "salvo Bank",
    currency: "NGN",
    country_id: "1",
  },
};
describe("EditBankDetails  : ", () => {
  it("renders a snapshot of <EditBankDetails  /> when editModal is false", () => {
    const el = mount(
      <Provider store={initializeStore(mockState)}>
        <EditBankDetails {...mockProps} editModal={false} />
      </Provider>
    );
    expect(EnzymeToJson(el)).toMatchSnapshot();
  });
  it("renders a snapshot of <EditBankDetails  /> when editModal is true", () => {
    const el = mount(
      <Provider store={initializeStore(mockState)}>
        <EditBankDetails {...mockProps} editModal={true} />
      </Provider>
    );
    expect(EnzymeToJson(el)).toMatchSnapshot();
  });
});

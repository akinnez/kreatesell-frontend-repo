import { dayOptions, ticketsOptions } from "../partials";


describe("Partials data: ", () => {
  it("renders a snapshot of dayOptions data", () => {
    expect(dayOptions).toMatchSnapshot();
  });
  it("renders a snapshot of ticketsOptions data", () => {
    expect(ticketsOptions).toMatchSnapshot();
  });
});

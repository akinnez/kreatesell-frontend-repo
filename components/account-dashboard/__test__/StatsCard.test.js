import renderer from "react-test-renderer";
import { StatsCard } from "../StatsCard";
import * as nextRouter from "next/router";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));

test("renders <StatsCard /> correctly in snapshot", () => {
  const statsCardMockProps = {
    name: "mockName",
    totalVisits: 90,
    unitSales: "mockImage",
    grossSales: "mockImage",
    profits: 100,
  };
  const statsCard = renderer
    .create(<StatsCard {...statsCardMockProps} />)
    .toJSON();
  expect(statsCard).toMatchSnapshot();
});

import PlayMedia from "../PlayMedia";
import toJson from "enzyme-to-json";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

const mockProps = {
  type: "audio",
  source: "http://mockAudioSource.com",
};

describe("PlayMedia: ", () => {
  it("renders a snapshot of <PlayMedia /> with mock props when open and closePlay are both false ", () => {
    const playMedia = mount(
      <PlayMedia {...mockProps} open={false} closePlay={false} />
    );
    expect(toJson(playMedia)).toMatchSnapshot();
  });
  it("renders a snapshot of <PlayMedia /> with mock props when open is true and closePlay is false ", () => {
    const playMedia = mount(
      <PlayMedia {...mockProps} open={true} closePlay={false} />
    );
    expect(toJson(playMedia)).toMatchSnapshot();
  });
  it("renders a snapshot of <PlayMedia /> with mock props when open is false and closePlay is true ", () => {
    const playMedia = mount(
      <PlayMedia {...mockProps} open={false} closePlay={true} />
    );
    expect(toJson(playMedia)).toMatchSnapshot();
  });
  it("renders a snapshot of <PlayMedia /> with mock props when open and closePlay are both true", () => {
    const playMedia = mount(
      <PlayMedia {...mockProps} open={true} closePlay={true} />
    );
    expect(toJson(playMedia)).toMatchSnapshot();
  });
});

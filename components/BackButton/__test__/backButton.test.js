import BackButton from '..';
import renderer from 'react-test-renderer';
import * as nextRouter from "next/router";


nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  route: "/",
}));

it('renders a snapshot of <BackButton />', () => {
    const btn = renderer.create(<BackButton />).toJSON();
    expect(btn).toMatchSnapshot();
})
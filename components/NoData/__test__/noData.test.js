import NoData from '..';
import renderer from 'react-test-renderer';

it('renders a snapshot of <NoData />', () => {
	const el = renderer.create(<NoData />).toJSON();
	expect(el).toMatchSnapshot();
});

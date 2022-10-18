import Overview from '..';
import renderer from 'react-test-renderer';

it('renders a snapshot of <Overview />', () => {
	const el = renderer.create(<Overview />).toJSON();
	expect(el).toMatchSnapshot();
});

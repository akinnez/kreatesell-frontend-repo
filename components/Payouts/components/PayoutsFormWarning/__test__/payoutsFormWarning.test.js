import PayoutsFormWarning from '..';
import renderer from 'react-test-renderer';

it('renders a snapshot of <PayoutsFormWarning />', () => {
	const warning = renderer.create(<PayoutsFormWarning />).toJSON();
	expect(warning).toMatchSnapshot();
});

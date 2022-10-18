import renderer from 'react-test-renderer';
import AsyncDataToCSV from '../AsyncDataToCSV';

it('renders a snapshot of <AsyncDataToCSV />', () => {
	const toCSV = renderer.create(<AsyncDataToCSV />).toJSON();
	expect(toCSV).toMatchSnapshot();
});

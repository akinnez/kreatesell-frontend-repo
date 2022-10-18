import RecentChargeBackTable from '../RecentChargeBackTable';
import renderer from 'react-test-renderer';

it('renders a snapshot of >RecentChargeBackTable />', () => {
	const table = renderer.create(<RecentChargeBackTable />).toJSON();
	expect(table).toMatchSnapshot();
});

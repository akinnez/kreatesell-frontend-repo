import DropDown from '..';
import renderer from 'react-test-renderer';

const mockProps = {
	updateRequest: jest.fn(),
	record: ['mockNote', '.', '%'],
};

it('renders a snapshot of <DropDown /> when notes is false', () => {
	const el = renderer.create(<DropDown {...mockProps} />).toJSON();
	expect(el).toMatchSnapshot();
});

import ManageSection from '../ManageSection';
import renderer from 'react-test-renderer';

const mockProps = {
	setMajorPage: jest.fn(),
	setIsTabActive: jest.fn(),
};

it('renders a snapshot of ManageSection ', () => {
	const elem = renderer.create(<ManageSection {...mockProps} />).toJSON();
	expect(elem).toMatchSnapshot();
});

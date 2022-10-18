import MembershipIndex from '../MembershipIndex';
import renderer from 'react-test-renderer';

const mockProps = {
	setMajorPage: jest.fn(),
	setIsTabActive: jest.fn(),
};

it('renders a snapshot of MembershipIndex ', () => {
	const elem = renderer.create(<MembershipIndex {...mockProps} />).toJSON();
	expect(elem).toMatchSnapshot();
});

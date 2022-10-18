import Tags from '..';
import renderer from 'react-test-renderer';

describe('Tags : ', () => {
	it('renders a snapshot of <Tags /> with mock props with default color', () => {
		const tags = renderer.create(<Tags>mock Child</Tags>).toJSON();
		expect(tags).toMatchSnapshot();
	});
	it('renders a snapshot of <Tags /> with mock props with color as green', () => {
		const tags = renderer
			.create(<Tags color="green">mock Child</Tags>)
			.toJSON();
		expect(tags).toMatchSnapshot();
	});
	it('renders a snapshot of <Tags /> with mock props with color as red', () => {
		const tags = renderer
			.create(<Tags color="red">mock Child</Tags>)
			.toJSON();
		expect(tags).toMatchSnapshot();
	});
	it('renders a snapshot of <Tags /> with mock props with color as ', () => {
		const tags = renderer
			.create(<Tags color="orange">mock Child</Tags>)
			.toJSON();
		expect(tags).toMatchSnapshot();
	});
});

import Performance from '..';
import renderer from 'react-test-renderer';

describe('Performance: ', () => {
	it('renders a snapshot of <Performance /> with no props passed', () => {
		const performanceSection = renderer.create(<Performance />).toJSON();
		expect(performanceSection).toMatchSnapshot();
	});
	it('renders a snapshot of <Performance /> with the sold props passed ONLY as a mock', () => {
		const performanceSection = renderer
			.create(<Performance sold={400} />)
			.toJSON();
		expect(performanceSection).toMatchSnapshot();
	});
	it('renders a snapshot of <Performance /> with the visit props passed ONLY as a mock', () => {
		const performanceSection = renderer
			.create(<Performance visit={20} />)
			.toJSON();
		expect(performanceSection).toMatchSnapshot();
	});
	it('renders a snapshot of <Performance /> with the both props passed using mocks', () => {
		const performanceSection = renderer
			.create(<Performance sold={300} visit={20} />)
			.toJSON();
		expect(performanceSection).toMatchSnapshot();
	});
});

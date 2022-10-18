import requestsColumns from '../requestsColumns';

it('renders a snapshot of the requestsColumns', () => {
	expect(requestsColumns()).toMatchSnapshot();
});

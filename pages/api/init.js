import {Client, resources} from 'coinbase-commerce-node';

Client.init(String(process.env.NEXT_COINBASE_API_KEY));
const {Charge} = resources;

const coinInitRoute = async (req, res) => {
	const {id, price} = req.body;

	try {
		const chargeData = {
			name: 'product.name',
			description: 'product.description',
			pricing_type: 'fixed_price',
			local_price: {
				amount: price,
				currency: 'USDT',
			},
			metadata: {
				id: id,
				userID: 1,
			},
		};

		const charge = await Charge.create(chargeData);

		res.send(charge);
	} catch (e) {
		res.status(500).send({error: e});
	}
};

export default coinInitRoute;

export const notificationTypes = {
	/*affiliate notifications*/
	'become affiliate':
		'Welcome! You are now part of the KreateSell Affiliate Marketing Program.',

	'affiliate request': (name, productName) => {
		return `${name} has approved your request to promote ${productName}. Best of luck!`;
	},

	/*kreator notifications*/
	'approve affiliate': (name) => {
		return `You have an affiliate request note from ${name}. Take a look!`;
	},

	'added product': 'You did it! Your first digital product is live.',

	register:
		'Welcome to KreateSell! You can now set up your store, register your account details for payouts, and put up your digital product(s) to start earning.',

	'store setup':
		'Hooray! Your store is live. Next is to register your account details for seamless payouts.',

	payout: 'Congrats! Your account details registration was successful. Time to put up your first Digital product.',

	'Sales' : (name, productName) => {
		return `${name} just bought ${productName}.`;
	},
	'Affiliate Sales' : (name, productName) => {
		return `${name} just made sales using your afflitate link for ${productName}.`;
	}
};


export const Toolbar = {
	modules: {
		toolbar: [
			[{header: '1'}, {header: '2'}, {header: [3, 4, 5, 6]}, {font: []}],
			[{size: []}],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{list: 'ordered'}, {list: 'bullet'}],
			[
				{align: ''},
				{align: 'center'},
				{align: 'right'},
				{align: 'justify'},
			],
			['link'], ['image'], ['video'],
			['clean'],
			['code-block'],
		],
	},
	formats: [
		'header',
		'font',
		'size',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'align',
		'link',
		'image',
		'video',
		'code-block',
	],
};

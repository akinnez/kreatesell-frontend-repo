// import {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';

import {Button} from 'antd';
import 'react-quill/dist/quill.snow.css';
import {Toolbar} from './ProductToolbar';
import styles from './ProductEditor.module.scss';
//WIP: Making the image in the Rich Text Editor resizeable
const ReactQuill = dynamic(import('react-quill'), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
});
// const ImageResizeDynamic = dynamic(import('quill-image-resize-module'), {
// 	ssr: false,
// });

// ReactQuill.Quill.register('modules/imageResize', ImageResizeDynamic);

// const ReactQuill =
// 	typeof window === 'object' ? require('react-quill') : () => false;

export default function ProductEditor({content, setContent}) {
	// const [enableEditor, setEnableEditor] = useState(false);

	return (
		<div className={styles.quillEditor} style={{minHeight: '250px'}}>
			<div className="w-full h-full">
				{/* {enableEditor ? ( */}
				<ReactQuill
					placeholder="Text here"
					value={content}
					onChange={(e) => setContent(e)}
					modules={Toolbar.modules}
					formats={Toolbar.formats}
				/>
				{/* ) : null} */}
			</div>
			<div className="absolute">
				<Button>Text</Button>
				<Button>Html</Button>
			</div>
		</div>
	);
}

import {Button} from 'antd';
import 'react-quill/dist/quill.snow.css';
import {Toolbar} from './ProductToolbar';
import styles from './ProductEditor.module.scss';
const ReactQuill =
	typeof window === 'object' ? require('react-quill') : () => false;

export default function ProductEditor({content, setContent}) {
	return (
		<div className={styles.quillEditor} style={{minHeight: '250px'}}>
			<div className="w-full h-full">
				<ReactQuill
					placeholder="Text here"
					value={content}
					onChange={(e) => setContent(e)}
					modules={Toolbar.modules}
					formats={Toolbar.formats}
				/>
			</div>
			<div className="absolute">
				<Button>Text</Button>
				<Button>Html</Button>
			</div>
		</div>
	);
}

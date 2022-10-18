import styles from './index.module.scss';
import 'react-quill/dist/quill.snow.css';

const RenderQuillHTML = ({html}) => (
	<div className={styles.container}>
		<div className="ql-container ql-snow">
			<div
				className="ql-editor"
				dangerouslySetInnerHTML={{__html: html}}
			/>
		</div>
	</div>
);

export default RenderQuillHTML;

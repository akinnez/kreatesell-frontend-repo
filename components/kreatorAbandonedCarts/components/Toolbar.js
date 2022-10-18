import {MdOutlinePersonAddAlt} from 'react-icons/md';

const Toolbar = () => (
	<div id="toolbar">
		<select
			className="ql-header"
			defaultValue={''}
			onChange={(e) => e.persist()}
		>
			<option value="1" />
			<option value="2" />
			<option value="3" />
			<option value="" />
		</select>
		<button className="ql-bold" />
		<button className="ql-italic" />
		<button className="ql-underline" />
		<button className="ql-strike" />
		<button className="ql-blockquote" />
		<select
			className="ql-align"
			defaultValue={''}
			onChange={(e) => e.persist()}
		>
			<option value="" />
			<option value="center" />
			<option value="right" />
		</select>
		<button className="ql-list" value="bullet" />
		<button className="ql-list" value="ordered" />
		<select className="ql-color" onChange={(e) => e.persist()} />
		<button className="ql-link" />
		<button className="ql-code-block" />
		<button className="ql-image" />
		<button className="ql-video" />
		<button className="ql-personification">
			<MdOutlinePersonAddAlt style={{fontSize: '20px'}} />
		</button>
	</div>
);

export default Toolbar;

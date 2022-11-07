import {Modal} from 'antd';
import {useEffect, useState} from 'react';
import Image from 'next/image'

export default function PlayMedia({type, open, source, closePlay}) {
	const [isOpen, setIsOpen] = useState(open);
	const handleclose = () => {
		setIsOpen(fasle);
	};
	return (
		<Modal
			title={null}
			footer={null}
			visible={isOpen}
			onCancel={() => {
				setIsOpen(false);
				closePlay(false);
			}}
			closable={false}
		>
			{/* <div>Hello There {source}</div> */}
			<Image src={source} alt="" width={800} height={500}/> 

			{/* {type === "audio" && <audio src={source} controls />} */}
		</Modal>
	);
}

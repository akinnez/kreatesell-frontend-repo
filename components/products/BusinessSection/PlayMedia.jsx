import { Modal } from "antd";
import { useEffect, useState } from "react";


export default function PlayMedia({type, open, source, closePlay}){
    const [isOpen, setIsOpen] = useState(true)
    useEffect(()=>{
        console.log('open', isOpen, 'PLAY', open)
    }, [isOpen, open])
    return(
        <Modal title={null}
        footer={null}
        visible={isOpen}
        onCancel={() => {
            setIsOpen(false)
            closePlay(false)
        }}
        closable={false}>
            {type === "audio" && <audio src={source} controls />}
        </Modal>
    )
}
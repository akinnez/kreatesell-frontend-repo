import styles from './ImageLoad.module.scss'
import { Progress } from 'antd';
export default function ImageLoad ({imageName, progress}){

    return(
        <div className="w-full ">
            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-normal text-gray-500 lowercase mb-0">{imageName ? imageName : 'Image uploading'}</h2>
                    <p className="text-xs mb-0 text-gray-500 cursor-pointer">Cancel</p>
                </div>
                <Progress percent={progress} strokeWidth="5px" showInfo={false} />
            </div>
        </div>
    )
}
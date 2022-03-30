import styles from './ImageLoad.module.scss'

export default function ImageLoad ({imageName}){

    return(
        <div className="w-full ">
            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base text-gray-500 lowercase mb-0">{imageName ? imageName : 'Image uploading'}</h2>
                    <p className="text-xs mb-0 text-gray-500 cursor-pointer">Cancel</p>
                </div>
                <div className={styles.imageLoader}>

                </div>
            </div>
        </div>
    )
}
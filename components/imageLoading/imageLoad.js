import { Progress } from 'antd';

export default function ImageLoad ({imageName,errors, progress, isError}){
    return(<>
        {isError ? 
        <div className="w-full ">
            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-0">
                    <h2 className="text-xs font-normal text-gray-500 lowercase mb-0">{imageName ? imageName.split('.')[0] : 'Image uploading'}</h2>
                    <p className={`text-xs mb-0 text-red-500 cursor-pointer`}>Failed</p>
                </div>
                <div className='w-full flex flex-col'>
                    <Progress percent={progress} status="exception" strokeWidth="5px" showInfo={false} />
                    <p className={`text-xs bottom-px mb-0 text-red-500 cursor-pointer`}>{errors? errors[0].code.split('-').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(' '): ''}</p>
                </div>
            </div>
        </div>
        :
        <div className="w-full ">
            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xs font-normal text-gray-500 lowercase mb-0">{imageName ? imageName.split('.')[0] : 'Image uploading'}</h2>
                    <p className={`text-xs mb-0 ${progress === 100 ? "text-green-500" : "text-gray-500"} cursor-pointer`}>{progress === 100 ? "Completed":"Cancel"}</p>
                </div>
                <Progress percent={progress} strokeWidth="5px" showInfo={false} />
            </div>
        </div>
        }
    </>
    )
}
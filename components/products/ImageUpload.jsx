import {DeleteIcon} from 'components/IconPack';
import ImageLoad from 'components/imageLoading/imageLoad';
import Image from 'next/image';
import styles from './CreateProduct.module.scss';
import axios from 'axios';
import {useEffect, useState} from 'react';

export default function ImageUpload({file, deleteFile, setUrl}) {
	const [progress, setProgress] = useState(0);
	const [image, setImage] = useState('');
	useEffect(() => {
		if (file.isEdits) {
			setProgress(100);
			return setImage(file.filename);
		}
		async function upload() {
			await uploadFile(file, setProgress);
		}
		upload();
	}, [file]);
	// async function uploadFile(file, cb) {
	//   const formData = new FormData();
	//   formData.append("upload_preset", "kreatesell");
	//   formData.append("file", file);
	//   const options = {
	//     onUploadProgress: (progressEvent) => {
	//       const { loaded, total } = progressEvent;
	//       let percent = Math.floor((loaded * 100) / total);
	//       cb(percent);
	//     },
	//   };

	//   try {
	//     const instance = axios.create();
	//     delete instance.defaults.headers.common["Authorization"];
	//     const { data } = await instance.post(
	//       "https://api.cloudinary.com/v1_1/salvoagency/image/upload",
	//       formData,
	//       options
	//     );
	//     setUrl(file, data?.secure_url);
	//     setImage(data?.secure_url);
	//   } catch (error) {
	//     console.log("ERROR", error);
	//   }
	// }
	async function uploadFile(file, cb) {
		// * file name must end in .jpg or png
		if (
			file.name.toLowerCase().endsWith('.jpg') ||
			file.name.toLowerCase().endsWith('.png') ||
			file.name.toLowerCase().endsWith('.jpeg')
		) {
			const formData = new FormData();
			formData.append('upload_preset', 'kreatesell');
			formData.append('file', file);
			const options = {
				onUploadProgress: (progressEvent) => {
					const {loaded, total} = progressEvent;
					let percent = Math.floor((loaded * 100) / total);
					cb(percent);
				},
				// UseFilename: true,
				// UniqueFilename: false,
			};

			try {
				const instance = axios.create();
				delete instance.defaults.headers.common['Authorization'];
				const {data} = await instance.post(
					'https://api.cloudinary.com/v1_1/salvoagency/image/upload',
					formData,
					options
				);
				setUrl(file, data?.secure_url);
				setImage(data?.secure_url);
			} catch (error) {
				console.log('ERROR', error);
			}
		}
		return;
	}
	return (
		<>
			{/* {image && ( */}
			<li
				className={
					styles.imageContent +
					' bg-white flex justify-between w-full rounded-lg p-1'
				}
			>
				<div className={styles.imageWrap}>
					{image && (
						<Image
							width="100"
							height="100"
							objectFit="cover"
							src={image}
							alt="user"
						/>
					)}
				</div>
				{/* {image && ( */}
				<>
					<div className="w-2/3">
						<ImageLoad
							imageName={`${file.name} (${progress}%)`}
							progress={progress}
						/>
					</div>
					<div
						className="w-1/6 flex justify-center cursor-pointer"
						onClick={() => deleteFile(file)}
					>
						<DeleteIcon color="#F5F5F5" width="40" height="40" />
					</div>
				</>
				{/* )} */}
				{/* <div className="w-2/3">
        <ImageLoad
          imageName={`${file.name} (${progress}%)`}
          progress={progress}
        />
      </div>
      <div
        className="w-1/6 flex justify-center cursor-pointer"
        onClick={() => deleteFile(file)}
      >
        <DeleteIcon color="#F5F5F5" width="40" height="40" />
      </div> */}
			</li>
			{/* )} */}
		</>
	);
}

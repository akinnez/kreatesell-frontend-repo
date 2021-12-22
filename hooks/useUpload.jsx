import { useState } from "react";
import { useDropzone } from "react-dropzone";

export const useUpload = ({ setFileChange }) => {
	const [files, setFiles] = useState([]);
	const [preview, setPreview] = useState([]);

	const getBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	};

	const onDrop = async (acceptedFiles) => {
		setFiles([...files, ...acceptedFiles]);
		setFileChange([...files, ...acceptedFiles]);
		let b64arr = [];
		const pr_arr = await acceptedFiles.map(
			(item, i) =>
				new Promise(async (res, rej) => {
					let b64 = await getBase64(item);
					b64arr.push({ url: b64, index: i });
					res(null);
				})
		);

		await Promise.all(pr_arr);
		setPreview([...preview, ...b64arr]);
	};

	const removeFile = () => {
		setFiles([]);
		setPreview([]);
	};

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	return { files, preview, getRootProps, getInputProps, removeFile };
};

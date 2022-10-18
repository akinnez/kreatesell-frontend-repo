const productImageFn = (files) => {
	if (!files || files.length === 0) return null;

	const imageFiles = files.find((file) => file.file_type === 1);

	if (!imageFiles.filename) return null;

	return imageFiles.filename.split(',');
};

export default productImageFn;

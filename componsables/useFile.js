const useFile = (file) => {
    if (!file || !file.target || !file.target.files) {
        throw new Error('The file object is invalid');
    }

    const tempFiles = file.target.files;

    let tempPreviewImages = [];

    if (!tempFiles || !tempFiles.length) {
        return { tempFiles: [], tempPreviewImages };
    }

    const promises = [...tempFiles].map((file) => {
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onload = () => {
                resolve(reader.result);
            }

            reader.onerror = (error) => {
                reject(error);
            }

            reader.readAsDataURL(file);
        });
    });

    return Promise.all(promises).then((results) => {
        tempPreviewImages = results;
        return { tempFiles, tempPreviewImages };
    }).catch((error) => {
        console.error(error);
        return { tempFiles: [], tempPreviewImages };
    });
}

export { useFile };
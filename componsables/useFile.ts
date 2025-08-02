const useFile = (file: Event): Promise<{ tempFiles: File[], tempPreviewImages: string[] }> => {
    if (!file || !file.target || !(file.target instanceof HTMLInputElement) || !file.target.files) {
        throw new Error('The file object is invalid');
    }

    const tempFiles: File[] = Array.from(file.target.files);

    let tempPreviewImages: string[] = [];

    if (!tempFiles.length) {
        return Promise.resolve({ tempFiles: [], tempPreviewImages });
    }

    const promises = tempFiles.map((file: File) => {
        const reader = new FileReader();

        return new Promise<string>((resolve, reject) => {
            reader.onload = () => {
                resolve(reader.result as string);
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
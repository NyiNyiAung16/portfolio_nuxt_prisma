

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event);
    const uploadFilePaths = [];
    

    console.log(uploadFilePaths)

    // files.forEach((file) => {
    //     const filePath = path.join(process.cwd(),'public/project', file.filename);
    //     fs.writeFileSync(filePath,file.data);
    //     uploadFilePaths.push(filePath);
    // })

    return uploadFilePaths;
})
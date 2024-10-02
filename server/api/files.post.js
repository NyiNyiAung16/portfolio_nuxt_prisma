export default defineEventHandler(async (event) => {
    try{
        const { files } = await readBody(event);
    
        const filesPaths = [];
    
        for(const file of files){
           let path =  await storeFileLocally(file,102,'../../public/project/photos');
           filesPaths.push(path);
        }
    
        return filesPaths;
    }catch(e){
        if(e instanceof Error) {
            throw createError({
                statusCode: e.statusCode,
                statusMessage:  e.message
            })
        }
    }
})
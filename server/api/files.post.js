
export default defineEventHandler(async (event) => {
    try{
        hasUser(event.context?.user);

        const { files } = await readBody(event);
    
        const filesPaths = [];
    
        for(const file of files){
           let path =  await storeFileLocally(file,102,'../../public/project/photos');
           filesPaths.push(path);
        }
    
        return filesPaths;
    }catch(error){
        throwError(error);
    }
})
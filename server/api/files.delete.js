export default defineEventHandler(async (event) => {
    try {
        hasUser(event.context?.user);

        const { files } = await readBody(event);
        
        for(const file of files){
            await deleteFile(file,'../../public/project/photos');
        }

        setResponseStatus(event, 200);
        return true;
    } catch (error) {
        throwError(error);
    }    
})
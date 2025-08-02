import cloudinary from "cloudinary";

export default defineEventHandler(async (event) => {
    try {
        hasUser(event.context?.user);
        const environment = useRuntimeConfig(event);

        const { images_path } = await readBody(event);

        cloudinary.v2.config({
            cloud_name: environment.public.cloudinary.cloudName,
            api_key: environment.cloudKey,
            api_secret: environment.cloudSecret
        });

        await cloudinary.v2.api.delete_resources(images_path);
        return { success: true };
    } catch (error: any) {
        throwError(error);
    }    
})
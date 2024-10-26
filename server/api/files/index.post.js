import cloudinary from "cloudinary";

export default defineEventHandler(async (event) => {
  try {
    const environment = useRuntimeConfig(event);

    const files = await readMultipartFormData(event);

    if(files.length === 0) {
      throw new Error('The file object is invalid');
    }

    cloudinary.v2.config({
      cloud_name: environment.public.cloudinary.cloudName,
      api_key: environment.cloudKey,
      api_secret: environment.cloudSecret,
    });

    let images_path = [];

    const promises = files.map((file) =>
      new Promise((resolve) =>
        cloudinary.v2.uploader.upload_stream((error, uploadResult) =>
          resolve(uploadResult)
        ).end(file.data)
      )
    );

    const uploadResults = await Promise.all(promises);
    images_path = uploadResults.map((result) => result.public_id);

    return { images_path };
  } catch (error) {
    throwError(error);
  }
});
import { createRouter } from '@/core/api/create-router';
import type { AuthVariables } from '@/core/api/middleware/auth';
import { deleteImage, deleteImageRoute } from './delete-image';
import { getImages, getImagesRoute } from './get-images';
import { uploadImage, uploadImageRoute } from './upload-image';

export const imagesRouter = createRouter<{ Variables: AuthVariables }>();

imagesRouter.openapi(getImagesRoute, getImages);
imagesRouter.openapi(uploadImageRoute, uploadImage);
imagesRouter.openapi(deleteImageRoute, deleteImage);

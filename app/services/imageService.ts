import getConfig from "next/config";
import { IFile } from "@raultom/react-file-upload/lib/interfaces";
import { isBlob } from "@raultom/common-helpers/lib/helpers";
import urlJoin from "url-join";

export const isImageBlob = (image: any) =>
  isBlob(image) && image.type.includes("image");

export const getImageBasePath = () =>
  getConfig().publicRuntimeConfig.uploadsBaseUrl;

export const getImagePath = (image: IFile | null | undefined) => {
  const startPath = getImageBasePath();
  if (!image) {
    return image;
  }

  if (image && isImageBlob(image)) {
    return (image as any).preview;
  }

  if (typeof image === "string") {
    return urlJoin(startPath, image);
  }

  if (typeof image === "object" && !!image.resourcePath) {
    return urlJoin(startPath, image.resourcePath);
  }

  return image;
};

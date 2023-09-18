import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "dhj6mwqcf",
  api_key: "179514716867121",
  api_secret: "heLYJOYF9RohGGDM_4gcNK5b7mY",
});

export const cloudUploads = async (path) => {
  // upload brand photo
  const logo = await cloudinary.v2.uploader.upload(path);

  return logo.secure_url;
};

/**
 * Delete Photo cloud
 * @param {*} req
 * @returns
 */
export const cloudPhotoDelete = async (url) => {
  const regex = /\/v\d+\/([^/]+)\./;
  const match = url.match(regex);

  if (match) {
    const publicID = match[1];
    await cloudinary.v2.uploader.destroy(publicID);
  }
};

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        // Remove the locally saved temporary file even if the upload failed,
        // so /public/temp never fills up with orphaned uploads.
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
};

/**
 * Deletes an asset from Cloudinary given its full delivery URL.
 * resourceType should be "image" for avatars/thumbnails or "video" for video files.
 */
const deleteFromCloudinary = async (fileUrl, resourceType = "image") => {
    try {
        if (!fileUrl) return null;

        const publicId = extractPublicId(fileUrl);
        if (!publicId) return null;

        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
        });

        return response;
    } catch (error) {
        console.error("Error deleting asset from Cloudinary:", error?.message);
        return null;
    }
};

/**
 * Extracts the public_id (including folder path, if any) from a Cloudinary URL, e.g.
 * https://res.cloudinary.com/demo/image/upload/v1690000000/folder/abc123.jpg -> folder/abc123
 */
const extractPublicId = (fileUrl) => {
    try {
        const urlParts = fileUrl.split("/");
        const uploadIndex = urlParts.findIndex((part) => part === "upload");
        if (uploadIndex === -1) return null;

        // Everything after "upload/v12345/" (skip the version segment if present)
        let relevantParts = urlParts.slice(uploadIndex + 1);
        if (relevantParts[0]?.startsWith("v") && /^\d+$/.test(relevantParts[0].slice(1))) {
            relevantParts = relevantParts.slice(1);
        }

        const fileNameWithExt = relevantParts.join("/");
        return fileNameWithExt.substring(0, fileNameWithExt.lastIndexOf("."));
    } catch (error) {
        return null;
    }
};

export { uploadOnCloudinary, deleteFromCloudinary };

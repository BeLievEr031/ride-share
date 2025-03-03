import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Config from "../config/Config";
import logger from "../config/logger";

const s3Client = new S3Client({
    region: Config.AWS_REGION!,
    credentials: {
        accessKeyId: Config.AWS_ACCESS_ID!,
        secretAccessKey: Config.AWS_SECRET_KEY!,
    },
});

export const generatePreSignedUrl = async (fileName: string, fileType: string) => {
    try {
        const command = new PutObjectCommand({
            Bucket: Config.AWS_BUCKET_NAME!,
            Key: `uploads/${Date.now()}-${fileName}`, // Ensure unique file name
            ContentType: fileType,
        });

        // Generate Pre-Signed URL (valid for 60 seconds)
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

        return signedUrl;
    } catch (error) {
        logger.error("Error generating pre-signed URL:", error);
        throw new Error("Failed to generate pre-signed URL");
    }
};

export const generatePreSignedUrlForFetch = async (fileKey: string) => {
    try {

        const command = new GetObjectCommand({
            Bucket: Config.AWS_BUCKET_NAME!,
            Key: fileKey
        });

        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
        return signedUrl;
    } catch (error) {
        logger.error(error);
        throw new Error("Unable to fetch object.")

    }
}
export default generatePreSignedUrl;

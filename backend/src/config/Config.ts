import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();

const { PORT,
    DB_URI,
    NODE_ENV,
    AWS_ACCESS_ID,
    AWS_SECRET_KEY,
    AWS_REGION,
    AWS_BUCKET_NAME
} = process.env

const Config = {
    PORT,
    DB_URI,
    NODE_ENV,
    AWS_ACCESS_ID,
    AWS_SECRET_KEY,
    AWS_REGION,
    AWS_BUCKET_NAME

} as const;

export default Config;
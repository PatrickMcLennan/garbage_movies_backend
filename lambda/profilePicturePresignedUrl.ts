import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { string, object } from 'joi';
import { DynamoDB } from 'aws-sdk';
import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

export const profilePicturePresignedUrlParams = object({
  email: string().email().max(30).required(),
  picture_name: string().required(),
  content_type: string().required(),
});

const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const params = event.queryStringParameters;

  if (!params)
    return {
      statusCode: 400,
      body: JSON.stringify({ errors: [`No query params were attached.`] }),
      headers: { 'Content-Type': 'text/plain' },
    };

  const { email, picture_name, content_type } = params;
  if (!email || !picture_name || !content_type)
    return {
      statusCode: 400,
      body: JSON.stringify({ errors: [`Params are missing.`] }),
      headers: { 'Content-Type': 'text/plain' },
    };

  const { error, value } = profilePicturePresignedUrlParams.validate(params);
  if (error)
    return {
      statusCode: 400,
      body: JSON.stringify({ errors: [error] }),
      headers: { 'Content-Type': 'text/plain' },
    };

  const dbParams = {
    TableName: `users`,
    Key: {
      email: value.email,
    },
  };
  const user = await new DynamoDB.DocumentClient().get(dbParams).promise();

  if (!user)
    return {
      statusCode: 400,
      body: JSON.stringify({ errors: [`The email sent could not be found in the DB`] }),
      headers: { 'Content-Type': 'text/plain' },
    };

  const bucketClient = new S3Client({ region: `us-east-1` });
  const Conditions = [{ acl: 'public-read' }, { bucket: 'movies' }, ['starts-with', '$key', 'user/eric/']]; // this isn't right

  return {
    statusCode: 400,
    body: JSON.stringify({ errors: [`The email sent could not be found in the DB`] }),
    headers: { 'Content-Type': 'text/plain' },
  };
};

exports.handler = handler;

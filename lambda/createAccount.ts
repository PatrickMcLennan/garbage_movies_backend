import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { apiResponse } from '../services/responses.factory';
import { string, object } from 'joi';

export const createAccountDto = object({
  firstName: string().max(30),
  lastName: string().max(30),
  email: string().email().max(30),
  picture: string().email().domain(),
  password: string().min(6).max(30),
});

const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  if (!event.body)
    return apiResponse({
      statusCode: 400,
      body: { errors: [`No body was attached to the response.`] },
      headers: { 'Content-Type': 'text/plain' },
    });

  const body = JSON.parse(event.body);
  const user = body.user;
  if (!user)
    return apiResponse({
      statusCode: 400,
      body: { errors: [`Missing Fields.`] },
      headers: { 'Content-Type': 'text/plain' },
    });

  const { error, value } = createAccountDto.validate(user);
  if (error)
    return apiResponse({ statusCode: 400, body: { errors: [error] }, headers: { 'Content-Type': 'text/plain' } });
  else
    return apiResponse({
      statusCode: 200,
      body: { message: `seems like everything is good` },
      headers: { 'Content-Type': 'text/plain' },
    });
};

exports.handler = handler;

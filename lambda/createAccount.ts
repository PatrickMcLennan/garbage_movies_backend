import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { string, object } from 'joi';

export const createAccountDto = object({
  firstName: string().max(30).required(),
  lastName: string().max(30).required(),
  email: string().email().max(30).required(),
  picture: string().required(),
  password: string().min(6).max(30).required(),
});

const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  if (!event.body)
    return {
      statusCode: 400,
      body: JSON.stringify({ errors: [`No body was attached to the response.`] }),
      headers: { 'Content-Type': 'text/plain' },
    };

  const body = JSON.parse(JSON.stringify(event.body));
  const user = body.user;
  if (!user)
    return {
      statusCode: 400,
      body: JSON.stringify({ errors: [`Missing Fields.`] }),
      headers: { 'Content-Type': 'text/plain' },
    };

  const { error, value } = createAccountDto.validate(user);
  if (error) console.error(error);
  if (error)
    return {
      statusCode: 400,
      body: JSON.stringify({ errors: [error] }),
      headers: { 'Content-Type': 'text/plain' },
    };
  else
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `seems like everything is good` }),
      headers: { 'Content-Type': 'text/plain' },
    };
};

exports.handler = handler;

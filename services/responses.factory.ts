import type { APIGatewayProxyResultV2 } from 'aws-lambda';

type ResponseArgs = {
  statusCode: number;
  body: { [key: string]: any };
  headers: { [key: string]: any };
};

export const apiResponse = ({ statusCode, body, headers }: ResponseArgs): APIGatewayProxyResultV2 => ({
  statusCode,
  headers,
  body: JSON.stringify(body, null, 2),
});

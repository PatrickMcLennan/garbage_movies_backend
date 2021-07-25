import * as cdk from '@aws-cdk/core';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import { LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';

export class ServerStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const moviesApi = new RestApi(this, `movies-api`);
    const api = moviesApi.root.addResource(`api`);
    const v1 = api.addResource(`v1`);

    const helloHandler = new Function(this, `HelloHandler`, {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('lambda'),
      handler: 'hello.handler',
    });
    v1.addMethod(`GET`, new LambdaIntegration(helloHandler));

    // Auth
    const auth = v1.addResource(`auth`);
    const login = auth.addResource(`login`);
    const createAccount = auth.addResource(`create-account`);

    const createAccountHandler = new Function(this, `CreateAccountHandler`, {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('lambda'),
      handler: 'createAccount.handler',
    });
    createAccount.addMethod(`POST`, new LambdaIntegration(createAccountHandler));
  }
}

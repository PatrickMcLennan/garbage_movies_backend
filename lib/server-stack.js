"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerStack = void 0;
const cdk = require("@aws-cdk/core");
const aws_lambda_1 = require("@aws-cdk/aws-lambda");
const aws_apigateway_1 = require("@aws-cdk/aws-apigateway");
class ServerStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const moviesApi = new aws_apigateway_1.RestApi(this, `movies-api`);
        const api = moviesApi.root.addResource(`api`);
        const v1 = api.addResource(`v1`);
        const helloHandler = new aws_lambda_1.Function(this, `HelloHandler`, {
            runtime: aws_lambda_1.Runtime.NODEJS_14_X,
            code: aws_lambda_1.Code.fromAsset('lambda'),
            handler: 'hello.handler',
        });
        v1.addMethod(`GET`, new aws_apigateway_1.LambdaIntegration(helloHandler));
        // Auth
        const auth = v1.addResource(`auth`);
        const login = auth.addResource(`login`);
        const createAccount = auth.addResource(`create-account`);
        const createAccountHandler = new aws_lambda_1.Function(this, `CreateAccountHandler`, {
            runtime: aws_lambda_1.Runtime.NODEJS_14_X,
            code: aws_lambda_1.Code.fromAsset('lambda'),
            handler: 'createAccount.handler',
        });
        createAccount.addMethod(`POST`, new aws_apigateway_1.LambdaIntegration(createAccountHandler));
    }
}
exports.ServerStack = ServerStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUNyQyxvREFBOEQ7QUFDOUQsNERBQXFFO0FBRXJFLE1BQWEsV0FBWSxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ3hDLFlBQVksS0FBYyxFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM1RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUFPLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2xELE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFakMsTUFBTSxZQUFZLEdBQUcsSUFBSSxxQkFBUSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDdEQsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztZQUM1QixJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQzlCLE9BQU8sRUFBRSxlQUFlO1NBQ3pCLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksa0NBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUV6RCxPQUFPO1FBQ1AsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUV6RCxNQUFNLG9CQUFvQixHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUU7WUFDdEUsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztZQUM1QixJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQzlCLE9BQU8sRUFBRSx1QkFBdUI7U0FDakMsQ0FBQyxDQUFDO1FBQ0gsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxrQ0FBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7SUFDL0UsQ0FBQztDQUNGO0FBM0JELGtDQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCB7IEZ1bmN0aW9uLCBSdW50aW1lLCBDb2RlIH0gZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XG5pbXBvcnQgeyBMYW1iZGFJbnRlZ3JhdGlvbiwgUmVzdEFwaSB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5JztcblxuZXhwb3J0IGNsYXNzIFNlcnZlclN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5BcHAsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IG1vdmllc0FwaSA9IG5ldyBSZXN0QXBpKHRoaXMsIGBtb3ZpZXMtYXBpYCk7XG4gICAgY29uc3QgYXBpID0gbW92aWVzQXBpLnJvb3QuYWRkUmVzb3VyY2UoYGFwaWApO1xuICAgIGNvbnN0IHYxID0gYXBpLmFkZFJlc291cmNlKGB2MWApO1xuXG4gICAgY29uc3QgaGVsbG9IYW5kbGVyID0gbmV3IEZ1bmN0aW9uKHRoaXMsIGBIZWxsb0hhbmRsZXJgLCB7XG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpLFxuICAgICAgaGFuZGxlcjogJ2hlbGxvLmhhbmRsZXInLFxuICAgIH0pO1xuICAgIHYxLmFkZE1ldGhvZChgR0VUYCwgbmV3IExhbWJkYUludGVncmF0aW9uKGhlbGxvSGFuZGxlcikpO1xuXG4gICAgLy8gQXV0aFxuICAgIGNvbnN0IGF1dGggPSB2MS5hZGRSZXNvdXJjZShgYXV0aGApO1xuICAgIGNvbnN0IGxvZ2luID0gYXV0aC5hZGRSZXNvdXJjZShgbG9naW5gKTtcbiAgICBjb25zdCBjcmVhdGVBY2NvdW50ID0gYXV0aC5hZGRSZXNvdXJjZShgY3JlYXRlLWFjY291bnRgKTtcblxuICAgIGNvbnN0IGNyZWF0ZUFjY291bnRIYW5kbGVyID0gbmV3IEZ1bmN0aW9uKHRoaXMsIGBDcmVhdGVBY2NvdW50SGFuZGxlcmAsIHtcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzE0X1gsXG4gICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldCgnbGFtYmRhJyksXG4gICAgICBoYW5kbGVyOiAnY3JlYXRlQWNjb3VudC5oYW5kbGVyJyxcbiAgICB9KTtcbiAgICBjcmVhdGVBY2NvdW50LmFkZE1ldGhvZChgUE9TVGAsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihjcmVhdGVBY2NvdW50SGFuZGxlcikpO1xuICB9XG59XG4iXX0=
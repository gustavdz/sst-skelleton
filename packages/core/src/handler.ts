import {
	Context,
	APIGatewayProxyResultV2,
	APIGatewayProxyEventV2WithJWTAuthorizer,
	Handler,
	Callback,
} from "aws-lambda";
import * as debug from "./debug";

export default function handler(lambda: Handler) {
	return async function (
		// event: APIGatewayProxyEventV2WithIAMAuthorizer,
		event: APIGatewayProxyEventV2WithJWTAuthorizer,
		context: Context,
		callback: Callback,
	): Promise<APIGatewayProxyResultV2> {
		let body, statusCode;

		// Start debugger
		debug.init(event);

		try {
			// Run the Lambda
			body = await lambda(event, context, callback);
			statusCode = 200;
		} catch (e: any) {
			// Print debug messages
			debug.flush(e);

			body = { error: e.message };
			statusCode = 500;
		}

		// Return HTTP response
		return {
			statusCode,
			body: JSON.stringify(body),
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		};
	};
}

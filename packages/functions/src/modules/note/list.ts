import Note from "@marqii-backend-challenge/core/db/entity/Note";
import connectToDB from "@marqii-backend-challenge/core/db";
import handler from "@marqii-backend-challenge/core/handler";
import { getUserDataFromCognito } from "@marqii-backend-challenge/core/utils/getUserDataFromCognito";
import noteRepository from "@marqii-backend-challenge/core/data/Note";
import { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2 } from "aws-lambda";

export const main = handler(
	async (event: APIGatewayProxyEventV2WithJWTAuthorizer): Promise<APIGatewayProxyResultV2> => {
		await connectToDB();
		const userAttributes = await getUserDataFromCognito(event);

		const notes: [Note[], number] = await noteRepository.getAllNotes({ where: { userId: userAttributes.cognitoId } });

		// Return the matching list of items in response body
		return { statusCode: 200, body: JSON.stringify(notes[0]) };
	},
);

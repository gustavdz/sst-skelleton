import handler from "@marqii-backend-challenge/core/handler";
import connectToDB from "@marqii-backend-challenge/core/db";
import Note from "@marqii-backend-challenge/core/db/entity/Note";
import noteRepository from "@marqii-backend-challenge/core/data/Note";
// import { getUserDataFromCognito } from "@marqii-backend-challenge/core/utils/getUserDataFromCognito";
import { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2 } from "aws-lambda";

export const main = handler(
	async (event: APIGatewayProxyEventV2WithJWTAuthorizer): Promise<APIGatewayProxyResultV2> => {
		try {
			const noteId: string = event.pathParameters?.id || "";
			await connectToDB();
			// const userAttributes = await getUserDataFromCognito(event);
			const note: Note | null = await noteRepository.findNoteById(noteId);

			// Return the matching list of items in response body
			return { statusCode: 200, body: JSON.stringify(note) };
		} catch (error) {
			throw new Error(JSON.stringify(error));
		}
	},
);

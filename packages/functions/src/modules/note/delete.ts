import handler from "@marqii-backend-challenge/core/handler";
import Note from "@marqii-backend-challenge/core/db/entity/Note";
import connectToDB from "@marqii-backend-challenge/core/db";
import noteRepository from "@marqii-backend-challenge/core/data/Note";
// import { getUserDataFromCognito } from "@marqii-backend-challenge/core/utils/getUserDataFromCognito";
import { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2 } from "aws-lambda";

export const main = handler(
	async (event: APIGatewayProxyEventV2WithJWTAuthorizer): Promise<APIGatewayProxyResultV2> => {
		const noteId: string = event.pathParameters?.id || "";
		await connectToDB();
		const note: Note | null = await noteRepository.findNoteById(noteId);
		if (!note) {
			throw new Error("Error");
		}
		await noteRepository.deleteNoteById(noteId);

		// Return the matching list of items in response body
		return { statusCode: 200, body: JSON.stringify({ noteId }) };
	},
);

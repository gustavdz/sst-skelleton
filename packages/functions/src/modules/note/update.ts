import handler from "@marqii-backend-challenge/core/handler";
import Note from "@marqii-backend-challenge/core/db/entity/Note";
import connectToDB from "@marqii-backend-challenge/core/db";
import noteRepository from "@marqii-backend-challenge/core/data/Note";
import { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2 } from "aws-lambda";
import { INoteRequest } from "./interfaces";
import updateNoteRequestValidation from "./validation/update-note";

export const main = handler(
	async (event: APIGatewayProxyEventV2WithJWTAuthorizer): Promise<APIGatewayProxyResultV2> => {
		const noteId: string = event.pathParameters?.id || "";
		const payload: INoteRequest = JSON.parse(String(event.body));
		updateNoteRequestValidation(payload);

		await connectToDB();

		const note: Note | null = await noteRepository.findNoteById(noteId);
		if (!note) {
			throw new Error("Error");
		}

		await noteRepository.updateNoteById(
			{ name: payload.name, content: payload.content, attachment: payload.attachment },
			note,
		);

		// Return the matching list of items in response body
		return { statusCode: 200, body: JSON.stringify({ noteId }) };
	},
);

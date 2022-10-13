import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TaskDocument = Task & Document;

@Schema()
export class Task {
	@Prop({ type: String, required: true })
	taskId: string;

	@Prop({ type: String, required: true })
	taskname: string;

	@Prop({ type: String, required: true })
	context: string;

	@Prop({ type: String, required: true })
	status: string;

	@Prop({ type: String, required: true })
	datecreated: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

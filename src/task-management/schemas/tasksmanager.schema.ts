import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TasksManagementDocument = TasksManagement & Document;

@Schema()
export class TasksManagement {
	@Prop({ type: String, required: true })
	taskId: string;

	@Prop({ type: String, required: true })
	userId: string;

	@Prop({ type: String, required: true })
	status: string;

	@Prop({ type: String, required: true })
	taskstartdate: string;

	@Prop({ type: String, required: true })
	taskenddate: string;
}

export const TasksManagementSchema =
	SchemaFactory.createForClass(TasksManagement);

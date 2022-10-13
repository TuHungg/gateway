import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TasksManagementController } from "./tasksmanager.controller";
import { TasksManagementHandler } from "../task-management/tasksmanager.handler";
import {
	TasksManagement,
	TasksManagementSchema,
} from "./schemas/tasksmanager.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: TasksManagement.name, schema: TasksManagementSchema },
		]),
	],
	controllers: [TasksManagementController],
	providers: [TasksManagementHandler],
})
export class TasksManagerModule {}

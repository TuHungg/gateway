import { Controller } from "@nestjs/common";
import mongoose from "mongoose";
import { TasksHandler } from "./tasks.handler";

@Controller()
export class TasksController {
	static tasksHandler: TasksHandler;

	constructor(tasksHandler: TasksHandler) {
		TasksController.tasksHandler = tasksHandler;
	}

	public static async createTask(
		taskname: string,
		context: string,
		status: string
	): Promise<string> {
		console.log("controller -- ", taskname, context, status);

		return TasksController.tasksHandler.createTask(
			taskname,
			context,
			status
		);
	}

	public static async update(
		taskId: mongoose.Types.ObjectId,
		taskname?: string,
		context?: string,
		status?: string,
		datecreated?: string
	): Promise<string> {
		return TasksController.tasksHandler.update(
			taskId,
			taskname,
			context,
			status,
			datecreated
		);
	}

	public async delete(taskId: mongoose.Types.ObjectId): Promise<string> {
		return TasksController.tasksHandler.delete(taskId);
	}
}

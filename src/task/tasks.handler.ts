import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { TasksRepository } from "./tasks.repository";
import { Task, TaskSchema } from "./schemas/tasks.schema";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

@Injectable()
export class TasksHandler implements TasksRepository {
	constructor(
		@InjectModel(Task.name) private taskModel: mongoose.Model<Task>
	) {}

	public async getTaskModel() {
		if (!this.taskModel) {
			this.taskModel = mongoose.model("task", TaskSchema);
		}

		return this.taskModel;
	}

	public async createTask(
		taskname: string,
		context: string,
		status: string
	): Promise<string> {
		const model = await this.getTaskModel();

		const datecreated = new Date().toLocaleDateString();
		const taskId = uuidv4();

		const task = await model.create({
			taskId,
			taskname,
			context,
			status,
			datecreated,
		});

		await task.save();

		return `Create task ${taskname} successfully`;
	}

	public async update(
		_id: mongoose.Types.ObjectId,
		taskname?: string,
		context?: string,
		status?: string,
		datecreated?: string
	): Promise<string> {
		const model = await this.getTaskModel();

		await model.updateOne(
			{ _id },
			{ taskname, context, status, datecreated }
		);

		return `Update task successfully`;
	}

	public async delete(taskId: mongoose.Types.ObjectId): Promise<string> {
		const model = await this.getTaskModel();

		await model.deleteOne({ taskId });

		return `Delete Task successfully`;
	}
}

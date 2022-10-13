import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { TasksManagementRepository } from "./tasksmanager.repository";
import {
	TasksManagementSchema,
	TasksManagement,
} from "./schemas/tasksmanager.schema";

@Injectable()
export class TasksManagementHandler implements TasksManagementRepository {
	constructor(
		@InjectModel(TasksManagement.name)
		private tasksManagementModel: mongoose.Model<TasksManagement>
	) {}

	public async getTasksManagementModel() {
		if (!this.tasksManagementModel) {
			this.tasksManagementModel = mongoose.model(
				"tasksManagement",
				TasksManagementSchema
			);
		}

		return this.tasksManagementModel;
	}

	public async createTaskforUser(
		taskId: string,
		userId: string,
		status: string
	): Promise<string> {
		const model = await this.getTasksManagementModel();

		const taskstartdate = new Date().toLocaleDateString();

		const taskenddate = "0/0/0";

		const setedTask = await model.create({
			taskId,
			userId,
			status,
			taskstartdate,
			taskenddate,
		});

		await setedTask.save();

		return `Set task for user successfully`;
	}

	public async setTaskforUser(
		_id: mongoose.Types.ObjectId,
		status: string,
		taskenddate: string
	): Promise<string> {
		const model = await this.getTasksManagementModel();

		await model.updateOne({ _id }, { status, taskenddate });

		return `Set task sucessfully`;
	}
}

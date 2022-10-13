import mongoose from "mongoose";

export interface TasksRepository {
	createTask(
		taskname: string,
		context: string,
		status: string
	): Promise<string>;

	update(
		_id: mongoose.Types.ObjectId,
		taskname?: string,
		context?: string,
		status?: string,
		datecreated?: string
	): Promise<string>;

	delete(_id: mongoose.Types.ObjectId): Promise<string>;
}

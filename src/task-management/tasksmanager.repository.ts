import mongoose from "mongoose";

export interface TasksManagementRepository {
	createTaskforUser(
		taskId: string,
		userId: string,
		status: string
	): Promise<string>;

	// getTaskListbyUserId(userId: string): Promise<void>;

	setTaskforUser(
		_id: mongoose.Types.ObjectId,
		status: string,
		taskenddate: string
	): Promise<string>;
}

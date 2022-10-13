"use strict";
import { Context, Service, ServiceBroker, ServiceSchema } from "moleculer";
import { TasksController } from "../src/task/tasks.controller";

export default class TasksService extends Service {
	// @ts-ignore
	public constructor(public broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: "tasks",

			settings: {},

			hooks: {},

			actions: {
				create: {
					rest: "POST /created-task",

					params: {
						taskname: { type: "string", optional: false },
						context: { type: "string", optional: false },
						status: { type: "string", optional: false },
					},
					handler: this.create,
				},

				update: {
					rest: "PUT /update-task",

					params: {
						taskId: { type: "string", optional: false },
						taskname: { type: "string", optional: true },
						context: { type: "string", optional: true },
						status: { type: "string", optional: true },
						datecreated: { type: "string", optional: true },
					},

					handler: this.update,
				},
			},

			events: {},

			methods: {},
			/**
			 * Loading sample data to the collection.
			async afterConnected() {
			 await this.adapter.collection.createIndex({ name: 1 });
			},
			 */
		});
	}

	private async create(ctx: any) {
		const { taskname, context, status } = ctx.params;

		console.log(taskname, context, status);

		const creted = await TasksController.createTask(
			taskname,
			context,
			status
		);

		console.log(creted);

		return creted;
	}

	private async update(ctx: any) {
		const { taskId, taskname, context, status, datecreated } = ctx.params;

		const updateTask = await TasksController.update(
			taskId,
			taskname,
			context,
			status,
			datecreated
		);

		return updateTask;
	}
}

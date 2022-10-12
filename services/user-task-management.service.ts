"use strict";
import { Context, Service, ServiceBroker, ServiceSchema } from "moleculer";
import { errorHandler } from "../moleculer.config";

export default class UserTaskManagementService extends Service {
	// @ts-ignore
	public constructor(public broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: "userTaskManagement",

			settings: {},

			hooks: {},

			actions: {
				getTasksByUserId: {
					rest: "GET /getTasksByUserId",

					handler(cxt: any) {
						broker.call("tasks.listTasks");

						return "Get Task";
					},
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
}

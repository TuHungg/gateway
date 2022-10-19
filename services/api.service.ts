import { Service, ServiceBroker } from "moleculer";
import * as ApiGateway from "moleculer-web";

export default class ApiService extends Service {
	public constructor(broker: ServiceBroker) {
		super(broker);
		// @ts-ignore
		this.parseServiceSchema({
			name: "gateway",
			mixins: [ApiGateway],

			settings: {
				port: process.env.PORT || 1200,
				path: "/api",

				routes: [
					{
						path: "/user-task-management",

						whitelist: ["user-task-management.*"],
						use: [],
						mergeParams: true,

						authentication: false,

						authorization: true,

						autoAliases: true,

						aliases: {
							"POST /createTaskItem":
								"user-task-management.create",

							"POST /set-task": "user-task-management.setTask",

							"PUT /updateStatus":
								"user-task-management.updateStatus",

							"GET /tasklistbyUserId":
								"user-task-management.getTasksListbyUserId",

							"GET /getTaskList":
								"user-task-management.getTaskList",
						},

						callingOptions: {},

						bodyParsers: {
							json: true,
						},

						mappingPolicy: "all", // Available values: "all", "restrict"

						logging: true,
					},

					{
						path: "/user",
						whitelist: ["user.*"],

						use: [],

						mergeParams: true,

						authentication: false,

						authorization: false,

						autoAliases: true,

						aliases: {
							"POST /signin": "user.signin",
							"POST /signup": "user.signup",
							"GET /": "user.getAllUser",
							"PUT /update-profile": "user.updateProfile",
						},

						callingOptions: {},

						bodyParsers: {
							json: {
								strict: false,
								limit: "1MB",
							},
							urlencoded: {
								extended: true,
								limit: "1MB",
							},
						},

						mappingPolicy: "all", // Available values: "all", "restrict"

						logging: true,
					},
				],
				// Do not log client side errors (does not log an error response when the error.code is 400<=X<500)
				log4XXResponses: false,
				// Logging the request parameters. Set to any log level to enable it. E.g. "info"
				logRequestParams: null,
				// Logging the response data. Set to any log level to enable it. E.g. "info"
				logResponseData: null,
				// Serve assets from "public" folder
				assets: {
					folder: "public",
					// Options to `server-static` module
					options: {},
				},
			},

			methods: {
				authorize: async (ctx, route, req, res) => {
					let auth = req.headers["authorization"];

					if (auth && auth.startsWith("Bearer")) {
						const token = auth.slice(7);

						const payload = await ctx.call("user.verifyToken", {
							token,
						});

						ctx.meta.user = payload;

						return Promise.resolve(ctx);
					} else {
						return Promise.reject("No token!");
					}
				},
			},
		});
	}
}

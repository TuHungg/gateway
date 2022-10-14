import { Service, ServiceBroker } from "moleculer";
import * as ApiGateway from "moleculer-web";

import { appNest } from "../src/main";

export default class ApiService extends Service {
	public constructor(broker: ServiceBroker) {
		super(broker);
		// @ts-ignore
		this.parseServiceSchema({
			name: "api",
			mixins: [ApiGateway],

			settings: {
				port: process.env.PORT || 1200,

				routes: [
					{
						path: "/api",
						whitelist: ["**"],
						// Route-level Express middlewares. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Middlewares
						use: [],
						// Enable/disable parameter merging method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Disable-merging
						mergeParams: true,

						// Enable authentication. Implement the logic into `authenticate` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authentication
						authentication: false,

						// Enable authorization. Implement the logic into `authorize` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authorization
						authorization: true,

						// The auto-alias feature allows you to declare your route alias directly in your services.
						// The gateway will dynamically build the full routes from service schema.
						autoAliases: true,

						aliases: {},

						// Calling options. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Calling-options
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

						// Mapping policy setting. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Mapping-policy
						mappingPolicy: "all", // Available values: "all", "restrict"

						// Enable/disable logging
						logging: true,
					},

					{
						path: "/api/auth",

						whitelist: ["user.signin", "user.signup"],

						mergeParams: true,
						authentication: false,
						authorization: false,
						autoAliases: true,

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

						mappingPolicy: "all",
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
				async authorize(ctx, route, req, res) {
					let auth = req.headers["authorization"];
					if (auth && auth.startsWith("Bearer")) {
						let token = auth.slice(7);
						const payload = await ctx.call("user.verifyToken", {
							token,
						});
						console.log(payload);
						ctx.meta.user = payload;
						return Promise.resolve(ctx);
					} else {
						return Promise.reject("No token");
					}
				},
			},
			created: this.startAppNest,
		});
	}

	private async startAppNest() {
		await appNest();
	}
}

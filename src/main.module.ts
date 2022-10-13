import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { TasksModule } from "./task/tasks.module";
import { TasksManagerModule } from "./task-management/tasksmanager.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot("mongodb://localhost:27017/neox"),
		TasksModule,
		TasksManagerModule,
	],
})
export class AppModule {}

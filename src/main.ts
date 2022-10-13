import { NestFactory } from "@nestjs/core";
import { AppModule } from "./main.module";

export async function appNest() {
	await NestFactory.create(AppModule);
}

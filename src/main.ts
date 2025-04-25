import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ExpressAdapter } from "@nestjs/platform-express";

async function bootstrap(): Promise<void> {
  const app =
    await NestFactory.create<INestApplication<ExpressAdapter>>(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get("frontEndUrl"),
    methods: ["GET", "DELETE", "POST", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get<number>("port"));
}
bootstrap();

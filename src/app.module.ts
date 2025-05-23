import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppConfig } from "./config/app.config";
import { DatabaseConfig } from "./config/db.config";
import { MongooseModule } from "@nestjs/mongoose";
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [AppConfig, DatabaseConfig], isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>("mongo.uri"),
      }),
    }),
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

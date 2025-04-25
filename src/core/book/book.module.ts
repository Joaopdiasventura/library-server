import { Module } from "@nestjs/common";
import { BookService } from "./book.service";
import { BookController } from "./book.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { BookSchema } from "./entities/book.entity";
import { MongoBookRepository } from "./repositories/book.mongo.repository";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Book", schema: BookSchema }])],
  controllers: [BookController],
  providers: [
    BookService,
    { provide: "BookRepository", useClass: MongoBookRepository },
  ],
})
export class BookModule {}

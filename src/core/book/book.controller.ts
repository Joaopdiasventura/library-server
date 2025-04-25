import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Book } from "./entities/book.entity";
import { Message } from "../../shared/interfaces/message";
import { ParseObjectIdPipe } from "../../shared/pipes/parse-object-id.pipe";

@Controller("book")
export class BookController {
  public constructor(private readonly bookService: BookService) {}

  @Post()
  public create(@Body() createBookDto: CreateBookDto): Promise<Message> {
    return this.bookService.create(createBookDto);
  }

  @Get("findTenFirsts")
  public async findTenFirsts(): Promise<Book[]> {
    return await this.bookService.findTenFirsts();
  }

  @Get(":id")
  public async findById(
    @Param("id", ParseObjectIdPipe) id: string,
  ): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Patch(":id")
  public update(
    @Param("id", ParseObjectIdPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Message> {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(":id")
  public delete(@Param("id", ParseObjectIdPipe) id: string): Promise<Message> {
    return this.bookService.delete(id);
  }
}

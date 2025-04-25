import { InjectModel } from "@nestjs/mongoose";
import { CreateBookDto } from "../dto/create-book.dto";
import { Book } from "../entities/book.entity";
import { BookRepository } from "./book.repository";
import { Model } from "mongoose";
import { UpdateBookDto } from "../dto/update-book.dto";

export class MongoBookRepository implements BookRepository {
  public constructor(
    @InjectModel("Book") private readonly bookModel: Model<Book>,
  ) {}

  public async create(createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookModel.create(createBookDto);
  }

  public async findById(id: string): Promise<Book> {
    return await this.bookModel.findById(id).exec();
  }

  public async findTenFirsts(): Promise<Book[]> {
    return await this.bookModel.find().sort("-createdAt").limit(10).exec();
  }

  public async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, updateBookDto).exec();
  }

  public async delete(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id).exec();
  }
}

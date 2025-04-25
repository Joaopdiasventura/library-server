import { CreateBookDto } from "../dto/create-book.dto";
import { UpdateBookDto } from "./../dto/update-book.dto";
import { Book } from "../entities/book.entity";

export interface BookRepository {
  create(createBookDto: CreateBookDto): Promise<Book>;
  findById(id: string): Promise<Book>;
  findTenFirsts(): Promise<Book[]>;
  update(id: string, updateBookDto: UpdateBookDto): Promise<Book>;
  delete(id: string): Promise<Book>;
}

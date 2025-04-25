import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { BookRepository } from "./repositories/book.repository";
import { Message } from "../../shared/interfaces/message";
import { Book } from "./entities/book.entity";

@Injectable()
export class BookService {
  public constructor(
    @Inject("BookRepository") private readonly bookRepository: BookRepository,
  ) {}

  public async create(createBookDto: CreateBookDto): Promise<Message> {
    await this.bookRepository.create(createBookDto);
    return { message: "Livro cadastrado com sucesso" };
  }

  public async findById(id: string): Promise<Book> {
    const book = await this.bookRepository.findById(id);
    if (!book) throw new NotFoundException("Livro não encontrado");
    return book;
  }

  public async findTenFirsts(): Promise<Book[]> {
    return await this.bookRepository.findTenFirsts();
  }

  public async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<Message> {
    await this.findById(id);
    await this.bookRepository.update(id, updateBookDto);
    return { message: "Livro atualizado com sucesso" };
  }

  public async delete(id: string): Promise<Message> {
    await this.findById(id);
    await this.bookRepository.delete(id);
    return { message: "Livro deletado com sucesso" };
  }
}

import { Test, TestingModule } from "@nestjs/testing";
import { BookService } from "../book.service";
import { BookRepository } from "../repositories/book.repository";
import { NotFoundException } from "@nestjs/common";
import { CreateBookDto } from "../dto/create-book.dto";
import { UpdateBookDto } from "../dto/update-book.dto";

describe("BookService", () => {
  let service: BookService;
  let repository: BookRepository;

  const mockBook = {
    _id: "123456789012345678901234",
    leader: "00000nam a2200000 u 4500",
    fields: [
      {
        tag: "100",
        indicators: ["1", " "],
        subfields: { a: "Autor Exemplo" },
      },
    ],
  };

  const mockRepository = {
    create: jest.fn().mockResolvedValue(mockBook),
    findById: jest
      .fn()
      .mockImplementation((id) =>
        id == mockBook._id ? Promise.resolve(mockBook) : Promise.resolve(null),
      ),
    update: jest.fn().mockResolvedValue(null),
    delete: jest.fn().mockResolvedValue(null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: "BookRepository", useValue: mockRepository },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    repository = module.get<BookRepository>("BookRepository");
  });

  it("should be defined", () => expect(service).toBeDefined());

  it("should create a book", async () => {
    const createBookDto: CreateBookDto = {
      leader: mockBook.leader,
      fields: mockBook.fields,
    };
    await expect(service.create(createBookDto)).resolves.toEqual({
      message: "Livro cadastrado com sucesso",
    });
    expect(repository.create).toHaveBeenCalledWith(createBookDto);
  });

  it("should find a book by ID", async () => {
    await expect(service.findById(mockBook._id)).resolves.toEqual(mockBook);
    expect(repository.findById).toHaveBeenCalledWith(mockBook._id);
  });

  it("should throw NotFoundException if book is not found", async () =>
    await expect(service.findById("nonexistent_id")).rejects.toThrow(
      NotFoundException,
    ));

  it("should update a book", async () => {
    const updateBookDto: UpdateBookDto = { leader: "new_leader" };
    await expect(service.update(mockBook._id, updateBookDto)).resolves.toEqual({
      message: "Livro atualizado com sucesso",
    });
    expect(repository.update).toHaveBeenCalledWith(mockBook._id, updateBookDto);
  });

  it("should delete a book", async () => {
    await expect(service.delete(mockBook._id)).resolves.toEqual({
      message: "Livro deletado com sucesso",
    });
    expect(repository.delete).toHaveBeenCalledWith(mockBook._id);
  });
});

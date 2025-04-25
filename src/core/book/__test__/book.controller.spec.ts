import { Test, TestingModule } from "@nestjs/testing";
import { BookController } from "../book.controller";
import { BookService } from "../book.service";
import { NotFoundException } from "@nestjs/common";
import { CreateBookDto } from "../dto/create-book.dto";
import { UpdateBookDto } from "../dto/update-book.dto";

describe("BookController", () => {
  let controller: BookController;
  let service: BookService;

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

  const mockBookService = {
    create: jest
      .fn()
      .mockResolvedValue({ message: "Livro cadastrado com sucesso" }),
    findById: jest
      .fn()
      .mockImplementation((id) =>
        id == mockBook._id
          ? Promise.resolve(mockBook)
          : Promise.reject(new NotFoundException()),
      ),
    update: jest
      .fn()
      .mockResolvedValue({ message: "Livro atualizado com sucesso" }),
    delete: jest
      .fn()
      .mockResolvedValue({ message: "Livro deletado com sucesso" }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it("should be defined", () => expect(controller).toBeDefined());

  it("should create a book", async () => {
    const createBookDto: CreateBookDto = {
      leader: mockBook.leader,
      fields: mockBook.fields,
    };
    await expect(controller.create(createBookDto)).resolves.toEqual({
      message: "Livro cadastrado com sucesso",
    });
    expect(service.create).toHaveBeenCalledWith(createBookDto);
  });

  it("should find a book by ID", async () => {
    await expect(controller.findById(mockBook._id)).resolves.toEqual(mockBook);
    expect(service.findById).toHaveBeenCalledWith(mockBook._id);
  });

  it("should throw NotFoundException if book is not found", async () =>
    await expect(controller.findById("nonexistent_id")).rejects.toThrow(
      NotFoundException,
    ));

  it("should update a book", async () => {
    const updateBookDto: UpdateBookDto = { leader: "new_leader" };
    await expect(
      controller.update(mockBook._id, updateBookDto),
    ).resolves.toEqual({
      message: "Livro atualizado com sucesso",
    });
    expect(service.update).toHaveBeenCalledWith(mockBook._id, updateBookDto);
  });

  it("should delete a book", async () => {
    await expect(controller.delete(mockBook._id)).resolves.toEqual({
      message: "Livro deletado com sucesso",
    });
    expect(service.delete).toHaveBeenCalledWith(mockBook._id);
  });
});

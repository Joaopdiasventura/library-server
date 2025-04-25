import { Test, TestingModule } from "@nestjs/testing";
import { StudentService } from "../student.service";
import { StudentRepository } from "../repositories/student.repository";
import { CreateStudentDto } from "../dto/create-student.dto";
import { NotFoundException } from "@nestjs/common";

describe("StudentService", () => {
  let service: StudentService;
  let repository: StudentRepository;

  const mockStudent = {
    _id: "123456789012345678901234",
    rm: "23000",
    name: "John Doe",
    email: "test@gmail.com",
  };

  const mockRepository = {
    create: jest.fn().mockResolvedValue(mockStudent),
    findById: jest
      .fn()
      .mockImplementation((id) =>
        id == mockStudent._id
          ? Promise.resolve(mockStudent)
          : Promise.resolve(null),
      ),
    findByRm: jest
      .fn()
      .mockImplementation((rm) =>
        rm == mockStudent.rm
          ? Promise.resolve(mockStudent)
          : Promise.resolve(null),
      ),
    findMany: jest.fn().mockResolvedValue([mockStudent]),
    update: jest.fn().mockResolvedValue(mockStudent),
    delete: jest.fn().mockResolvedValue(mockStudent),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        { provide: "StudentRepository", useValue: mockRepository },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    repository = module.get<StudentRepository>("StudentRepository");
  });

  it("should be defined", () => expect(service).toBeDefined());

  it("should create a student", async () => {
    const createStudentDto: CreateStudentDto = {
      rm: "23000",
      name: "John Doe",
      email: "test@gmail.com",
    };
    await expect(service.create(createStudentDto)).resolves.toEqual({
      message: "Aluno cadastrado com sucesso",
    });
    expect(repository.create).toHaveBeenCalledWith(createStudentDto);
  });

  it("should find a student by ID", async () => {
    await expect(service.findById(mockStudent._id)).resolves.toEqual(
      mockStudent,
    );
    expect(repository.findById).toHaveBeenCalledWith(mockStudent._id);
  });

  it("should throw NotFoundException if student is not found", async () => {
    await expect(service.findById("nonexistent_id")).rejects.toThrow(
      NotFoundException,
    );
  });

  it("should find a student by RM", async () => {
    await expect(service.findByRm(mockStudent.rm)).resolves.toEqual(
      mockStudent,
    );
    expect(repository.findByRm).toHaveBeenCalledWith(mockStudent.rm);
  });

  it("should throw NotFoundException if student is not found by RM", async () => {
    await expect(service.findByRm("nonexistent_rm")).rejects.toThrow(
      NotFoundException,
    );
  });

  it("should update a student", async () => {
    const updateStudentDto = { name: "Jane Doe" };
    await expect(
      service.update(mockStudent._id, updateStudentDto),
    ).resolves.toEqual({
      message: "Aluno atualizado com sucesso",
    });
    expect(repository.update).toHaveBeenCalledWith(
      mockStudent._id,
      updateStudentDto,
    );
  });

  it("should delete a student", async () => {
    await expect(service.delete(mockStudent._id)).resolves.toEqual({
      message: "Aluno deletado com sucesso",
    });
    expect(repository.delete).toHaveBeenCalledWith(mockStudent._id);
  });
});

import { Test, TestingModule } from "@nestjs/testing";
import { StudentController } from "../student.controller";
import { StudentService } from "../student.service";
import { NotFoundException } from "@nestjs/common";

describe("StudentController", () => {
  let controller: StudentController;
  let service: StudentService;

  const mockStudent = {
    _id: "123456789012345678901234",
    rm: "23000",
    name: "John Doe",
    email: "test@gmail.com",
  };

  const mockService = {
    create: jest
      .fn()
      .mockResolvedValue({ message: "Aluno cadastrado com sucesso" }),
    findById: jest
      .fn()
      .mockImplementation((id) =>
        id == mockStudent._id
          ? Promise.resolve(mockStudent)
          : Promise.reject(new NotFoundException()),
      ),
    findByRm: jest
      .fn()
      .mockImplementation((rm) =>
        rm == mockStudent.rm
          ? Promise.resolve(mockStudent)
          : Promise.reject(new NotFoundException()),
      ),
    findMany: jest.fn().mockResolvedValue([mockStudent]),
    update: jest
      .fn()
      .mockResolvedValue({ message: "Aluno atualizado com sucesso" }),
    delete: jest
      .fn()
      .mockResolvedValue({ message: "Aluno deletado com sucesso" }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [{ provide: StudentService, useValue: mockService }],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
  });

  it("should be defined", () => expect(controller).toBeDefined());

  it("should create a student", async () => {
    const createStudentDto = {
      rm: "23000",
      name: "John Doe",
      email: "",
    };
    await expect(controller.create(createStudentDto)).resolves.toEqual({
      message: "Aluno cadastrado com sucesso",
    });
    expect(service.create).toHaveBeenCalledWith(createStudentDto);
  });

  it("should find a student by ID", async () => {
    await expect(controller.findById(mockStudent._id)).resolves.toEqual(
      mockStudent,
    );
    expect(service.findById).toHaveBeenCalledWith(mockStudent._id);
  });

  it("should throw NotFoundException if student is not found", async () => {
    await expect(controller.findById("nonexistent_id")).rejects.toThrow(
      NotFoundException,
    );
  });

  it("should find a student by RM", async () => {
    await expect(service.findByRm(mockStudent.rm)).resolves.toEqual(
      mockStudent,
    );
    expect(service.findByRm).toHaveBeenCalledWith(mockStudent.rm);
  });

  it("should throw NotFoundException if student is not found by RM", async () => {
    await expect(controller.findByRm("nonexistent_rm")).rejects.toThrow(
      NotFoundException,
    );
  });

  it("should update a student", async () => {
    const updateStudentDto = { name: "Jane Doe" };
    await expect(
      controller.update(mockStudent._id, updateStudentDto),
    ).resolves.toEqual({
      message: "Aluno atualizado com sucesso",
    });
    expect(service.update).toHaveBeenCalledWith(
      mockStudent._id,
      updateStudentDto,
    );
  });

  it("should delete a student", async () => {
    await expect(controller.delete(mockStudent._id)).resolves.toEqual({
      message: "Aluno deletado com sucesso",
    });
    expect(service.delete).toHaveBeenCalledWith(mockStudent._id);
  });
});

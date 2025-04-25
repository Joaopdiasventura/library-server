import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Message } from "../../shared/interfaces/message";
import { StudentRepository } from "./repositories/student.repository";
import { Student } from "./entities/student.entity";

@Injectable()
export class StudentService {
  public constructor(
    @Inject("StudentRepository")
    private readonly studentRepository: StudentRepository,
  ) {}

  public async create(createStudentDto: CreateStudentDto): Promise<Message> {
    await this.ensureRmIsNotUsed(createStudentDto.rm);
    await this.studentRepository.create(createStudentDto);
    return { message: "Aluno cadastrado com sucesso" };
  }

  public async findMany(page: number): Promise<Student[]> {
    return await this.studentRepository.findMany(page);
  }

  public async findById(id: string): Promise<Student> {
    const student = await this.studentRepository.findById(id);
    if (!student) throw new NotFoundException("Aluno não encontrado");
    return student;
  }

  public async findByRm(rm: string): Promise<Student> {
    const student = await this.studentRepository.findByRm(rm);
    if (!student) throw new NotFoundException("Aluno não encontrado");
    return student;
  }

  public async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Message> {
    await this.findById(id);
    await this.studentRepository.update(id, updateStudentDto);
    return { message: "Aluno atualizado com sucesso" };
  }

  public async delete(id: string): Promise<Message> {
    await this.findById(id);
    await this.delete(id);
    return { message: "Aluno deletado com sucesso" };
  }

  private async ensureRmIsNotUsed(rm: string): Promise<void> {
    try {
      const student = await this.findByRm(rm);
      if (student)
        throw new BadRequestException("Esse rm já está sendo utilizado");
    } catch {
      return;
    }
  }
}

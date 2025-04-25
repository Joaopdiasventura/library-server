import { Student } from "../entities/student.entity";
import { CreateStudentDto } from "./../dto/create-student.dto";
import { UpdateStudentDto } from "../dto/update-student.dto";

export interface StudentRepository {
  create(createStudentDto: CreateStudentDto): Promise<Student>;
  findById(id: string): Promise<Student>;
  findByRm(rm: string): Promise<Student>;
  findMany(page: number): Promise<Student[]>;
  update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student>;
  delete(id: string): Promise<Student>;
}

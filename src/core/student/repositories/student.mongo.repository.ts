import { InjectModel } from "@nestjs/mongoose";
import { CreateStudentDto } from "../dto/create-student.dto";
import { UpdateStudentDto } from "../dto/update-student.dto";
import { Student } from "../entities/student.entity";
import { StudentRepository } from "./student.repository";
import { Model } from "mongoose";

export class MongoStudentRepository implements StudentRepository {
  public constructor(
    @InjectModel("Student") private readonly studentModel: Model<Student>,
  ) {}

  public async create(createStudentDto: CreateStudentDto): Promise<Student> {
    return await this.studentModel.create(createStudentDto);
  }

  public async findById(id: string): Promise<Student> {
    return await this.studentModel.findById(id).exec();
  }

  public async findByRm(rm: string): Promise<Student> {
    return await this.studentModel.findOne({ rm }).exec();
  }

  public async findMany(page: number): Promise<Student[]> {
    return await this.studentModel
      .find()
      .limit(10)
      .skip(page * 10)
      .sort({ rm: 1 })
      .exec();
  }

  public async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    return await this.studentModel
      .findByIdAndUpdate(id, updateStudentDto)
      .exec();
  }

  public async delete(id: string): Promise<Student> {
    return await this.studentModel.findByIdAndDelete(id).exec();
  }
}

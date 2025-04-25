import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { StudentService } from "./student.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Message } from "../../shared/interfaces/message";
import { Student } from "./entities/student.entity";
import { ParseObjectIdPipe } from "../../shared/pipes/parse-object-id.pipe";

@Controller("student")
export class StudentController {
  public constructor(private readonly studentService: StudentService) {}

  @Post()
  public async create(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<Message> {
    return this.studentService.create(createStudentDto);
  }

  @Get(":page")
  public async findMany(
    @Param("page", ParseIntPipe) page: number,
  ): Promise<Student[]> {
    return this.studentService.findMany(page < 0 ? 0 : page);
  }

  @Get("id/:id")
  public async findById(@Param("id") id: string): Promise<Student> {
    return this.studentService.findById(id);
  }

  @Get("rm/:rm")
  public async findByRm(@Param("rm") rm: string): Promise<Student> {
    return this.studentService.findByRm(rm);
  }

  @Patch(":id")
  public async update(
    @Param("id", ParseObjectIdPipe) id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<Message> {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(":id")
  public async delete(
    @Param("id", ParseObjectIdPipe) id: string,
  ): Promise<Message> {
    return this.studentService.delete(id);
  }
}

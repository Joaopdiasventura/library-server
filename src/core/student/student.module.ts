import { Module } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentSchema } from "./entities/student.entity";
import { MongoStudentRepository } from "./repositories/student.mongo.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Student", schema: StudentSchema }]),
  ],
  controllers: [StudentController],
  providers: [
    StudentService,
    { provide: "StudentRepository", useClass: MongoStudentRepository },
  ],
})
export class StudentModule {}

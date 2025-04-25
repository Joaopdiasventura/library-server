import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [BookModule, StudentModule]
})
export class CoreModule {}

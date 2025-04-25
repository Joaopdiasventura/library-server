import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateStudentDto {
  @IsString({ message: "Digite um RM válido" })
  @IsNotEmpty({ message: "Digite um RM válido" })
  public rm: string;

  @IsString({ message: "Digite um nome válido" })
  @IsNotEmpty({ message: "Digite um nome válido" })
  public name: string;

  @IsEmail({}, { message: "Digite um email válido" })
  public email: string;
}

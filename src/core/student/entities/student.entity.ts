import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({versionKey: false})
export class Student extends Document{
    @Prop({required: true, unique: true})
    public rm: string
    @Prop({required: true})
    public name: string
    @Prop({required: true})
    public email: string
}

export const StudentSchema = SchemaFactory.createForClass(Student);
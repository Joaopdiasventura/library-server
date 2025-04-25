import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

class Field {
  @Prop({ required: true })
  public tag: string;

  @Prop({ type: [String], required: true })
  public indicators: string[];

  @Prop({ type: Map, of: String, required: true })
  public subfields: Record<string, string>;
}

@Schema({ versionKey: false, timestamps: true })
export class Book extends Document<string, Book, Book> {
  @Prop({ required: true })
  public leader: string;

  @Prop({ type: [Field], required: true })
  public fields: Field[];
}

export const BookSchema = SchemaFactory.createForClass(Book);

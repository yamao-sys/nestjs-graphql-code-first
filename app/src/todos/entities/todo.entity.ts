import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SubTodo } from '../../sub-todos/entities/sub-todo.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('todos')
export class Todo extends BaseEntity {
  @Field(() => Int, { description: 'todoのPrimary ID' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  // @IsNotEmpty({ message: 'タイトルは必須です。' })
  // @Length(1, 255, {
  //   message:
  //     'タイトルは$constraint1文字以上$constraint2文字以下での入力をお願いします。',
  // })
  @Field(() => String, { description: 'todoのtitle' })
  @Column()
  title!: string;

  @Field(() => String, { description: 'todoのcontent' })
  @Column({
    type: 'text',
    nullable: true,
  })
  content!: string;

  // @Field(() => Array<SubTodo, { description: 'todoのsub todo' })
  @OneToMany(() => SubTodo, (subTodo) => subTodo.todo, {
    cascade: true, // todoの保存時に一緒に保存する
  })
  subTodos?: SubTodo[];
}

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Todo } from '../../todos/entities/todo.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('sub_todos')
export class SubTodo extends BaseEntity {
  @Field(() => Int, { description: 'sub_todoのPrimary ID' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ type: 'bigint', name: 'todo_id' })
  todoId!: number;

  @ManyToOne(() => Todo, (todo) => todo.subTodos)
  @JoinColumn({
    name: 'todo_id',
    referencedColumnName: 'id',
  })
  todo: Todo;

  // @IsNotEmpty({ message: 'タイトルは必須です。' })
  // @Length(1, 255, {
  //   message:
  //     'タイトルは$constraint1文字以上$constraint2文字以下での入力をお願いします。',
  // })
  @Field(() => String, { description: 'sub_todoのtitle' })
  @Column()
  title!: string;

  @Field(() => String, { description: 'sub_todoのcontent' })
  @Column({
    type: 'text',
    nullable: true,
  })
  content!: string;
}

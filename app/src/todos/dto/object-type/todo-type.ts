import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SubTodo } from '../../../sub-todos/entities/sub-todo.entity';

@ObjectType()
export class TodoType {
  @Field(() => Int, { description: 'todo id' })
  id: number;

  @Field(() => String, { description: 'todo title' })
  title!: string;

  @Field(() => String, { description: 'todo content' })
  content!: string;

  // SubTodo
  @Field(() => [SubTodo], { description: 'sub todo' })
  subTodos: SubTodo[];
}

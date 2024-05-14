import { CreateTodoInput } from './create-todo.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @Field(() => Int, { description: 'todoのid' })
  id!: number;

  @Field(() => String, { description: 'todoのtitle' })
  title!: string;

  @Field(() => String, { description: 'todoのcontent' })
  content!: string;
}

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'todoのtitle' })
  title!: string;

  @Field(() => String, { description: 'todoのcontent' })
  content!: string;
}

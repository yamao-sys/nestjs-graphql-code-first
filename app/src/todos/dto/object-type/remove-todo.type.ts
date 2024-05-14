import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RemoveTodoType {
  @Field(() => Boolean, { description: 'todoのtitle' })
  result!: boolean;
}

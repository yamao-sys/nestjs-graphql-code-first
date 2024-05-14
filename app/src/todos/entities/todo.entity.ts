import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

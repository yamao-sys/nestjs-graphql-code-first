import { Test, TestingModule } from '@nestjs/testing';
import { TodosResolver } from './todos.resolver';
import { TodosService } from './todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '../../typeorm.config';
import { Todo } from './entities/todo.entity';

describe('TodosResolver', () => {
  let resolver: TodosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeormConfig),
        TypeOrmModule.forFeature([Todo]),
      ],
      providers: [TodosResolver, TodosService],
    }).compile();

    resolver = module.get<TodosResolver>(TodosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

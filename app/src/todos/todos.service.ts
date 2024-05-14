import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  create(createTodoInput: CreateTodoInput) {
    return this.todoRepository.save(createTodoInput);
  }

  findAll() {
    // NOTE: JOINして条件指定したい場合などにqueryBuilderは有用
    // return this.todoRepository
    //   .createQueryBuilder('todo')
    //   .leftJoinAndSelect('todo.subTodos', 'subTodos')
    //   .where('subTodos.title = :title', { title: 'test title4' })
    //   .getMany();

    // NOTE: 単にJOINしたい場合はfindのrelationsオプションを使用(※1)
    return this.todoRepository.find({
      relations: ['subTodos'],
    });
    // NOTE: ※1は以下のようにも書ける
    // return this.todoRepository
    //   .createQueryBuilder('todo')
    //   .leftJoinAndSelect('todo.subTodos', 'subTodos')
    //   .getMany();
  }

  findOne(id: number) {
    return this.todoRepository.findOne({
      where: { id },
      loadEagerRelations: false,
      relationLoadStrategy: 'query', // JOINせず個別にSQL発行
      relations: ['subTodos'],
    });
  }

  async update(id: number, updateTodoInput: UpdateTodoInput) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException();
    }
    todo.title = updateTodoInput.title;
    todo.content = updateTodoInput.content;

    return await this.todoRepository.save(todo);
  }

  async remove(id: number) {
    const result = await this.todoRepository.delete(id);
    return !!result.affected;
  }
}

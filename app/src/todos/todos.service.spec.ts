import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { datasource } from '../../data-source';
import { Repository } from 'typeorm';
import { typeormConfig } from '../../typeorm.config';

describe('TodosService', () => {
  let service: TodosService;
  let todoRepository: Repository<Todo>;

  beforeAll(async () => {
    await datasource.initialize();
    todoRepository = datasource.getRepository(Todo);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeormConfig),
        TypeOrmModule.forFeature([Todo]),
      ],
      providers: [TodosService],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  afterEach(async () => {
    // テスト毎に、テーブル内のデータを削除する。
    await datasource.synchronize(true);
  });

  afterAll(async () => {
    await datasource.destroy();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#findAll', () => {
    beforeEach(async () => {
      await todoRepository.save([
        {
          title: 'test title1',
          content: 'test content1',
          subTodos: [
            {
              title: 'test sub title1',
              content: 'test sub content1',
            },
            {
              title: 'test sub title2',
              content: 'test sub content2',
            },
          ],
        },
        { title: 'test title2', content: 'test content2' },
      ]);
    });

    it('todoの一覧がアソシエーション先まで含めて取得できること', async () => {
      const result = await service.findAll();

      expect(result.length).toEqual(2);
      const result_titles = result.map((todo) => todo.title);
      expect(result_titles).toContain('test title1');
      expect(result_titles).toContain('test title2');

      // アソシエーション先まで含めて取得できていることの確認
      expect(result[0].subTodos?.length).toEqual(2);
      const result_sub_titles = result[0].subTodos?.map(
        (subTodo) => subTodo.title,
      );
      expect(result_sub_titles).toContain('test sub title1');
      expect(result_sub_titles).toContain('test sub title2');
      expect(result[1].subTodos?.length).toEqual(0);
    });
  });

  describe('#findOne', () => {
    describe('アソシエーション先も含む場合', () => {
      beforeEach(async () => {
        await todoRepository.save([
          {
            title: 'test title1',
            content: 'test content1',
            subTodos: [
              {
                title: 'test sub title1',
                content: 'test sub content1',
              },
              {
                title: 'test sub title2',
                content: 'test sub content2',
              },
            ],
          },
        ]);
      });

      it('指定したfieldが取得できること(アソシエーション先含む)', async () => {
        const todo = await service.findOne(1);

        expect(todo?.title).toEqual('test title1');
        expect(todo?.content).toEqual('test content1');
        // NOTE: アソシエーション先の取得ができていることの確認
        expect(todo?.subTodos?.length).toEqual(2);
        const result_sub_titles = todo?.subTodos?.map(
          (subTodo) => subTodo.title,
        );
        expect(result_sub_titles).toContain('test sub title1');
        expect(result_sub_titles).toContain('test sub title2');
      });
    });

    describe('アソシエーション先を含まない場合', () => {
      beforeEach(async () => {
        await todoRepository.save([
          { title: 'test title2', content: 'test content2' },
        ]);
      });

      it('指定したfieldが取得できること(アソシエーション先なし)', async () => {
        const todo = await service.findOne(1);

        expect(todo?.title).toEqual('test title2');
        expect(todo?.content).toEqual('test content2');
        // NOTE: アソシエーション先が0件であることの確認
        expect(todo?.subTodos?.length).toEqual(0);
      });
    });
  });

  describe('#create', () => {
    it('todoが作成できること', async () => {
      await service.create({ title: 'test title1', content: 'test content1' });
      const createdTodo = await todoRepository.findOneBy({
        title: 'test title1',
        content: 'test content1',
      });
      expect(!!createdTodo).toBeTruthy();
    });
  });

  describe('#update', () => {
    beforeEach(async () => {
      await todoRepository.save([
        {
          title: 'test title1',
          content: 'test content1',
        },
      ]);
    });

    it('指定したfieldが取得できること(アソシエーション先含む)', async () => {
      await service.update(1, {
        id: 1,
        title: 'test updated title1',
        content: 'test updated content1',
      });

      const updatedTodo = await todoRepository.findOneBy({
        title: 'test updated title1',
        content: 'test updated content1',
      });
      expect(!!updatedTodo).toBeTruthy();
    });
  });

  describe('#remove', () => {
    beforeEach(async () => {
      await todoRepository.save([
        {
          title: 'test title1',
          content: 'test content1',
        },
      ]);
    });

    it('指定したfieldが取得できること(アソシエーション先含む)', async () => {
      await service.remove(1);

      const removedTodo = await todoRepository.findOneBy({
        title: 'test title1',
        content: 'test content1',
      });
      expect(!!removedTodo).toBeFalsy();
    });
  });
});

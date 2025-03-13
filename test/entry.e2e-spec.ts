import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoriesService } from '../src/categories/categories.service';
import { Repository } from 'typeorm';
import { Entry } from '../src/entries/entities/entry.entity';
import { EntriesService } from '../src/entries/entries.service';
import { CreateCategoryDto } from '../src/categories/dto/create-category.dto';
import * as request from 'supertest';

describe('EntryController (e2e)', () => {
  let app: INestApplication;
  let categoriesService: CategoriesService;
  let entryRepository: Repository<Entry>;
  let entryService: EntriesService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    categoriesService = moduleFixture.get(CategoriesService);
    entryService = moduleFixture.get(EntriesService);
    entryRepository = moduleFixture.get(getRepositoryToken(Entry));
    entryRepository.query('DELETE FROM entry');

    // app.useGlobalPipes(new ValidationPipe())
    await app.init();
  });

  describe('POST /entries', () => {
    it('should create a new entry', async () => {
      // Arrange
      const category: CreateCategoryDto = {
        title: 'Food',
        description: 'The food I buy',
      };
      const createdCategory = await categoriesService.create(category);

      // Act
      const response = await request(app.getHttpServer())
        .post('/entries')
        .send({
          title: 'Eggs',
          amount: 200,
          category: createdCategory,
        })
        .expect(201);

      console.log(response.body);

      // Assert
      expect(response.body.title).toBe('Eggs');
      expect(response.body.amount).toBe(200);
      expect(response.body.category.id).toBe(createdCategory.id);
    });
  });
});

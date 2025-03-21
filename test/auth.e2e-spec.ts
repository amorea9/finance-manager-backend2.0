import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../src/authentication/entities/user';
import { UsersService } from '../src/users/users.service';
import { AuthService } from '../src/authentication/auth.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let usersRepository: Repository<UserEntity>;
  let usersService: UsersService;
  let authService: AuthService;
  // let connection: DataSource;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    usersService = moduleFixture.get(UsersService);
    authService = moduleFixture.get(AuthService);
    usersRepository = moduleFixture.get(getRepositoryToken(UserEntity));
    await usersRepository.clear();

    // connection = moduleFixture.get(DataSource);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Signup', () => {
    it('should create a user', async () => {
      const user = { email: 'chr', password: '1234' };

      // Act
      const { body } = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(user)
        .expect(201);

      //   console.log(body);

      expect(body.email).toEqual('chr');
      expect(body.role).toEqual('user');
      expect(body.id).toBeDefined();
    });
  });

  describe('Login', () => {
    it('should login and get a token', async () => {
      await usersService.create('chr', '1234');

      const login = { email: 'chr', password: '1234' };
      // Act
      const { body } = await request(app.getHttpServer())
        .post('/auth/login')
        .send(login)
        .expect(201);

      expect(body.access_token).toBeDefined();
    });
  });

  describe('Upgrade users', () => {
    it('should upgrade the role of the user to premium', async () => {
      await usersService.create('kirs', '1234');

      const { access_token } = await authService.login({
        email: 'kirs',
        password: '1234',
      });

      const { body } = await request(app.getHttpServer())
        .post('/auth/upgrade')
        .auth(access_token, { type: 'bearer' })
        .send();

      expect(body.role).toEqual('premium');

      // expect(body.message).toEqual("You got through the gate")
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

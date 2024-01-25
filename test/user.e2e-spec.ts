import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DBSeedingService } from '../src/common/db-seeding.service';
import { TestData } from '../src/common/test-data';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const newUser = {
    name: 'user3',
    email: 'user3@example.com',
    password: 'password',
  };
  const updateUser = {
    name: 'user1',
    email: 'user1update@example.com',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // seed data
    const dbSeedingService =
      moduleFixture.get<DBSeedingService>(DBSeedingService);
    await dbSeedingService.cleanUsers();
    await dbSeedingService.seedUsers();
  });

  it('/user GET- retrieve all Users', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect(TestData.expected_allUsers);
  });

  it('/user/1 GET- retrieve user by id', () => {
    return request(app.getHttpServer())
      .get('/user/1')
      .expect(200)
      .expect(TestData.expected_user1);
  });

  it('/user POST- create user)', async () => {
    const res = await request(app.getHttpServer())
      .post('/user')
      .send(newUser)
      .expect(201);

    expect(res.body.user_name).toBe(newUser.name);
    expect(res.body.email).toBe(newUser.email);
  });

  it('/user POST- should return exceptions if user already exist', async () => {
    const res = await request(app.getHttpServer())
      .post('/user')
      .send(TestData.expected_user1)
      .expect(409); // 409 Conflict

    expect(res.body.message).toBe('The email is already be used');
  });

  it('/user PUT- update user', async () => {
    const res = await request(app.getHttpServer())
      .put('/user/1')
      .send(updateUser)
      .expect(200);
    expect(res.body.user_name).toBe(updateUser.name);
    expect(res.body.email).toBe(updateUser.email);
  });

  it('/user DELETE delete user', async () => {
    const res = await request(app.getHttpServer()).put('/user/2').expect(200);
    expect(res.body.id).toBe(2);
  });

  afterAll(() => {
    app.close();
  });
});

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth GraphQL (e2e)', () => {
  let app: INestApplication;
  const graphqlEndpoint = '/graphql';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new user', async () => {
    const createUserMutation = `
      mutation {
        createUser(createUserInput: {
          name: "Shihab Bukri",
          email: "shihab@example.com",
          age: 25,
          username: "shihab",
          password: "123456"
        }) {
          userId
          name
          email
          age
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query: createUserMutation })
      .expect(200);

    expect(response.body.data.createUser.name).toBe('Shihab Bukri');
    expect(response.body.data.createUser.email).toBe('shihab@example.com');
  });

  it('should login successfully', async () => {
    const loginMutation = `
      mutation {
        login(loginData: {
          username: "shihab",
          password: "123456"
        })
      }
    `;

    const response = await request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({ query: loginMutation })
      .expect(200);

    expect(response.body.data.login).toBeDefined();
  });
});

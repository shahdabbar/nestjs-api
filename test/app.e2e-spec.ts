import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CorsConfig } from 'src/shared/models/cors-config.model';
import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const modulRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = modulRef.createNestApplication();
    const cors: CorsConfig = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    };
    app.enableCors(cors);
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  it.todo('should pass');

  //   beforeEach(async () => {
  //     const moduleFixture: TestingModule = await Test.createTestingModule({
  //       imports: [AppModule],
  //     }).compile();

  //     app = moduleFixture.createNestApplication();
  //     await app.init();
  //   });

  //   it('/ (GET)', () => {
  //     return request(app.getHttpServer())
  //       .get('/')
  //       .expect(200)
  //       .expect('Hello World!');
  //   });
});

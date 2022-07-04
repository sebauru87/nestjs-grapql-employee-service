import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppModule } from './../src/app.module';
import { Employee } from '../src/employee/entities/employee.entity';
import { Project } from '../src/project/entities/project.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const mockEmployee = {
    id: 'b7ad77a1-e85a-45f8-bf14-83277c83fee2',
    firstName: 'gonza',
    lastName: 'ferre',
  };
  const mockProject = {
    id: '3554921b-3994-48bd-9d34-5efc4c4a7600',
    name: 'matematica B',
    code: 11,
  };
  const mockEmployeeRepository = {
    find: jest.fn().mockResolvedValue([mockEmployee]),
  };
  const mockProjectRepository = {
    find: jest.fn().mockResolvedValue([mockProject]),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(Employee))
      .useValue(mockEmployeeRepository)
      .overrideProvider(getRepositoryToken(Project))
      .useValue(mockProjectRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get all employees', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: '{getAllEmployees{id firstName lastName}}',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.getAllEmployees.length).toBe(1);
        expect(res.body.data.getAllEmployees[0]).toEqual({
          id: 'b7ad77a1-e85a-45f8-bf14-83277c83fee2',
          firstName: 'gonza',
          lastName: 'ferre',
        });
      });
  });

  it('should get all projects', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: '{getAllProjects{id name code}}',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.getAllProjects.length).toBe(1);
        expect(res.body.data.getAllProjects[0]).toEqual({
          id: '3554921b-3994-48bd-9d34-5efc4c4a7600',
          name: 'matematica B',
          code: 11,
        });
      });
  });
});

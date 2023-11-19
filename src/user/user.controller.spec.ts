import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const mockUserService = {
  getAll: jest.fn(),
  getById: jest.fn(),
  getByEmail: jest.fn(),
  createUser: jest.fn(),
  delete: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {provide: UserService, useValue: mockUserService}
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { CreateUsersDto } from './create-user.dto';

const mockUserService = {
  getAll: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  createUser: jest.fn(),
  delete: jest.fn(),
};
const mockUserDto = {
  id: 1,
  name: 'User1',
  email: 'user1@example.com',
} as UserDto;

const mockCreateUserDto = {
  name: 'User1',
  email: 'user1@example.com',
  password: 'password',
} as CreateUsersDto;

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get user by id', async () => {
    const userId = 1;
    jest.spyOn(mockUserService, 'getById').mockResolvedValue(mockUserDto);

    const result = await controller.getById(userId);

    expect(service.getById).toHaveBeenCalled();
    expect(result).toEqual(mockUserDto);
  });

  it('should create a user', async () => {
    jest.spyOn(mockUserService, 'createUser').mockResolvedValue(mockUserDto);

    const result = await controller.create(mockCreateUserDto);

    expect(service.createUser).toHaveBeenCalled();
    expect(result).toEqual(mockUserDto);
  });

  it('should update a user', async () => {
    const userId = 1;
    jest.spyOn(mockUserService, 'update').mockResolvedValue(mockUserDto);

    const result = await controller.update(userId, mockUserDto);

    expect(service.update).toHaveBeenCalled();
    expect(result).toEqual(mockUserDto);
  });

  it('should delete a user', async () => {
    const userId = 1;
    const deleteResult = {
      raw: [],
      affected: 1,
    };
    jest.spyOn(mockUserService, 'delete').mockResolvedValue(deleteResult);

    const result = await controller.delete(userId);

    expect(service.delete).toHaveBeenCalled();
    expect(result).toEqual(deleteResult);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from '../common/entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUsersDto } from './create-user.dto';
import { UserDto } from './user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import exp from 'constants';

// Mock data
const mockUsers = [
  {
    id: 1,
    user_name: 'User1',
    email: 'user1@example.com',
    password: 'password1',
  },
  {
    id: 2,
    user_name: 'User2',
    email: 'user2@example.com',
    password: 'password2',
  },
];

const mockUserRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let mockRepository: Repository<UserEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    mockRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a user', async () => {
    const userId = 1;
    jest.spyOn(mockRepository, 'findOne').mockResolvedValue(mockUsers[0]);
    const result = await service.getById(userId);

    expect(mockRepository.findOne).toHaveBeenCalled();
    expect(result).toEqual(mockUsers[0]);
  });

  it('should return a user by email', async () => {
    const userEmail = 'user1@example.com';
    jest.spyOn(mockRepository, 'findOne').mockResolvedValue(mockUsers[0]);

    const result = await service.getByEmail(userEmail);
    expect(result).toEqual(mockUsers[0]);
    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { email: userEmail },
    });
  });

  it('should create a user', async () => {
    const createUserDto = {
      name: mockUsers[0].user_name,
      email: mockUsers[0].email,
      password: mockUsers[0].password,
    } as CreateUsersDto;

    const expectedUser = {
      id: 1,
      name: mockUsers[0].user_name,
      email: mockUsers[0].email,
    } as UserDto;
    jest.spyOn(mockRepository, 'save').mockResolvedValue(mockUsers[0]);
    jest.spyOn(mockRepository, 'findOne').mockResolvedValue(null);

    const result = await service.createUser(createUserDto);
    expect(mockRepository.save).toHaveBeenCalled();
    expect(result).toEqual(expectedUser);
  });


  it('should createUser return 409 exception when email supplied already exist', async () => {
    const createUserDto = {
      name: 'John',
      email: 'John@gmail.com',
      password: '123',
    } as CreateUsersDto;

    jest.spyOn(mockRepository, 'save').mockResolvedValue(mockUsers[0]);
    jest.spyOn(mockRepository, 'findOne').mockResolvedValue(mockUsers[0]);

    await expect(service.createUser(createUserDto)).rejects.toThrowError(
      new HttpException('The email is already be used', HttpStatus.CONFLICT),
    );
  });

  it('should update a user', async () => {
    const userDto = {
      id: 1,
      name: 'new name',
      email: 'newemail@gmail.com',
    } as UserDto;

    jest.spyOn(mockRepository, 'save').mockResolvedValue(mockUsers[0]);
    jest.spyOn(mockRepository, 'findOne').mockResolvedValue(mockUsers[0]);

    const result = await service.update(1, userDto);
    expect(mockRepository.save).toHaveBeenCalled();
    expect(result.user_name).toEqual('new name');
    expect(result.email).toEqual('newemail@gmail.com');
  });

  it('should delete a user', async () => {
    jest.spyOn(mockRepository, 'delete').mockResolvedValue(null);

    const result = await service.delete(1);
    expect(mockRepository.delete).toHaveBeenCalled();
    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

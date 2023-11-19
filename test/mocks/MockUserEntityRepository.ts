import { UserEntity } from "../../src/common/entities/user.entity";
import { Repository } from "typeorm";

export class MockUserEntityRepository extends Repository<UserEntity> {

}
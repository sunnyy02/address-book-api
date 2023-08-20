import { OmitType } from "@nestjs/mapped-types";
import { RoleDto } from "./role.dto";

export class CreateRoleDto extends OmitType(RoleDto, ['id' ]) { }
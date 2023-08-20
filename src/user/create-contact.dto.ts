import { OmitType } from "@nestjs/mapped-types";
import { ContactDto } from "./contact.dto";

export class CreateContactDto extends OmitType(ContactDto, ['id' ]) { }
import { HttpStatus } from '@nestjs/common';
import { BaseAddressException } from '../base-address-exception';

export class DuplicateAddressException extends BaseAddressException {
  constructor(addressLine: string) {
    super(`The address '${addressLine}' already exists.`, HttpStatus.CONFLICT);
  }
}
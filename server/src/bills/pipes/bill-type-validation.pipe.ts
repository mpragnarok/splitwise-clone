import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BillType } from '../bill.model';

export class BillTypeValidationPipe implements PipeTransform {
  readonly allowedTypes = [
    BillType.ENTERTAINMENT,
    BillType.FOOD_AND_DRINK,
    BillType.HOME,
    BillType.LIFE,
    BillType.TRANSPORTATION,
    BillType.UNCATEGORIZED,
    BillType.UTILITIES,
  ];
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value);
    value.type = value.type.toUpperCase();

    if (!this.isTypeValid(value.type)) {
      throw new BadRequestException(`${value.type} is an invalid type`);
    }
    return value;
  }

  private isTypeValid(type: any) {
    const idx = this.allowedTypes.indexOf(type);

    return idx !== -1;
  }
}

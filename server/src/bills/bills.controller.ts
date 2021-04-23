import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Bill, BillType } from './bill.model';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { GetBillsFilterDto } from './dto/get-bills-filter.dto';
import { UpdateBillByIdDto } from './dto/update-bill-by-id.dtc';
import { BillTypeValidationPipe } from './pipes/bill-type-validation.pipe';

@Controller('bills')
export class BillsController {
  constructor(private billsService: BillsService) {}

  @Get()
  getBills(@Query(ValidationPipe) filterDto: GetBillsFilterDto): Bill[] {
    if (Object.keys(filterDto).length) {
      return this.billsService.getBillsWithFilters(filterDto);
    }
    return this.billsService.getAllBills();
  }

  @Get('/:id')
  getBillById(@Param('id') id: string): Bill {
    return this.billsService.getBillById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBills(@Body() createBillDto: CreateBillDto): Bill {
    return this.billsService.createBill(createBillDto);
  }

  @Delete('/:id')
  deleteBill(@Param('id') id: string): void {
    this.billsService.deleteBill(id);
  }

  @Patch('/:id')
  updateBill(
    @Param('id') id: string,
    @Body(BillTypeValidationPipe) updateBillDto: UpdateBillByIdDto,
  ): Bill {
    return this.billsService.updateBillById(id, updateBillDto);
  }
}

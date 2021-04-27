import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Bill } from './bill.entity';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { GetBillsFilterDto } from './dto/get-bills-filter.dto';
import { UpdateBillDto } from './dto/update-bill.dtc';
import { BillTypeValidationPipe } from './pipes/bill-type-validation.pipe';

@Controller('bills')
export class BillsController {
  constructor(private billsService: BillsService) {}

  @Get()
  getBills(@Query(ValidationPipe) filterDto: GetBillsFilterDto) {
    return this.billsService.getBills(filterDto);
  }

  @Get('/:id')
  getBillById(@Param('id', ParseIntPipe) id: number): Promise<Bill> {
    return this.billsService.getBillById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBills(@Body() createBillDto: CreateBillDto): Promise<Bill> {
    return this.billsService.createBill(createBillDto);
  }

  @Delete('/:id')
  deleteBill(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.billsService.deleteBill(id);
  }

  @Patch('/:id')
  updateBill(
    @Param('id', ParseIntPipe) id: number,
    @Body(BillTypeValidationPipe) updateBillDto: UpdateBillDto,
  ): Promise<Bill> {
    return this.billsService.updateBill(id, updateBillDto);
  }
}

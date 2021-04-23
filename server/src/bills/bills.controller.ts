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

@Controller('bills')
export class BillsController {
  constructor(private billsService: BillsService) {}

  @Get()
  async getBills(@Query() filterDto: GetBillsFilterDto): Promise<Bill[]> {
    if (Object.keys(filterDto).length) {
      return this.billsService.getBillsWithFilters(filterDto);
    }
    return this.billsService.getAllBills();
  }

  @Get('/:id')
  async getBillById(@Param('id') id: string): Promise<Bill> {
    return this.billsService.getBillById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createBills(@Body() createBillDto: CreateBillDto): Promise<Bill> {
    return this.billsService.createBill(createBillDto);
  }

  @Delete('/:id')
  async deleteBill(@Param('id') id: string): Promise<void> {
    this.billsService.deleteBill(id);
  }

  @Patch('/:id')
  updateBill(
    @Param('id') id: string,
    @Body() updateBillDto: UpdateBillByIdDto,
  ): Promise<Bill> {
    return this.billsService.updateBillById(id, updateBillDto);
  }
}

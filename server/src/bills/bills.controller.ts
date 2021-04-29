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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Bill } from './bill.entity';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { GetBillsFilterDto } from './dto/get-bills-filter.dto';
import { UpdateBillDto } from './dto/update-bill.dtc';
import { BillTypeValidationPipe } from './pipes/bill-type-validation.pipe';

@Controller('bills')
@UseGuards(AuthGuard())
export class BillsController {
  constructor(private billsService: BillsService) {}

  @Get()
  getBills(
    @Query(ValidationPipe) filterDto: GetBillsFilterDto,
    @GetUser() user: User,
  ) {
    return this.billsService.getBills(filterDto, user);
  }

  @Get('/:id')
  getBillById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Bill> {
    return this.billsService.getBillById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBill(
    @Body() createBillDto: CreateBillDto,
    @GetUser() user: User,
  ): Promise<Bill> {
    return this.billsService.createBill(createBillDto, user);
  }

  @Delete('/:id')
  deleteBill(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.billsService.deleteBill(id, user);
  }

  @Patch('/:id')
  updateBill(
    @Param('id', ParseIntPipe) id: number,
    @Body(BillTypeValidationPipe) updateBillDto: UpdateBillDto,
    @GetUser() user: User,
  ): Promise<Bill> {
    return this.billsService.updateBill(id, updateBillDto, user);
  }
}

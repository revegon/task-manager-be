import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BaseService } from '../services/base.service';
import { BaseEntity } from '../entities/base.entity';
import { RequestDto } from '../dtos/req';

export abstract class BaseController<
  T extends BaseEntity,
  Req extends RequestDto,
> {
  constructor(private readonly baseService: BaseService<T>) {}

  @Post()
  create(@Body() createDto: Req) {
    return this.baseService.create(createDto);
  }

  @Get()
  findAll() {
    return this.baseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.baseService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDto: Req) {
    return this.baseService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.baseService.delete(id);
  }
}

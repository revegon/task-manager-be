import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BaseService } from '../services/base.service';
import { BaseEntity } from '../entities/base.entity';
import { RequestDto, SearchDto } from '../dtos/req.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../guards/jwt.guard';

export abstract class BaseController<
  T extends BaseEntity,
  Req extends RequestDto,
  Search extends SearchDto,
> {
  constructor(private readonly baseService: BaseService<T>) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createDto: Req, req: Request) {
    return this.baseService.create(createDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllOrSearch(@Query() search: Search) {
    const { page, size, ...rest } = search;
    return this.baseService.getPaginatedRecords(rest, page, size);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number) {
    return this.baseService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: number, @Body() updateDto: Req, req: Request) {
    return this.baseService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number) {
    return this.baseService.delete(id);
  }
}

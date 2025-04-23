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
import { RequestDto, RespDto, SearchDto } from '../dtos/common.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../guards/jwt.guard';

export abstract class BaseController<
  T extends BaseEntity,
  Req extends RequestDto,
  Search extends SearchDto,
  Resp extends RespDto,
> {
  constructor(private readonly baseService: BaseService<T>) {}

  protected abstract transformToResp(entity: T): Resp;

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createDto: Req, req: Request) {
    return this.transformToResp(await this.baseService.create(createDto));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllOrSearch(@Query() search: Search) {
    const { page, size, ...query } = search;
    const { data, ...rest } = await this.baseService.getPaginatedRecords(
      query,
      page,
      size,
    );
    return { ...rest, data: data.map(this.transformToResp) };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number) {
    const data = await this.baseService.findOne(id);
    return data && this.transformToResp(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() updateDto: Req, req: Request) {
    const data = await this.baseService.update(id, updateDto);
    return data && this.transformToResp(data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number) {
    return this.baseService.delete(id);
  }
}

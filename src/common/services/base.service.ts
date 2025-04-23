import { BadRequestException, Injectable } from '@nestjs/common';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export abstract class BaseService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}

  async create(data: Partial<Record<keyof T, any>>) {
    const entity = this.repository.create(data as DeepPartial<T>);
    return await this.repository.save(entity);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async getPaginatedRecords(
    options?: FindManyOptions<T>,
    page: number = 1,
    limit: number = 10,
  ) {
    const queryParams = options || {};
    const [entities, total] = await this.repository.findAndCount({
      ...queryParams,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: entities,
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<T | null> {
    return this.repository.findOne({ where: { id } as any });
  }

  async update(
    id: number,
    data: Partial<Record<keyof T, any>> & QueryDeepPartialEntity<T>,
  ) {
    const entity = this.findOne(id);
    if (!entity) {
      throw new BadRequestException('No record exist with id: ' + id);
    }
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number) {
    await this.repository.delete(id);
  }
}

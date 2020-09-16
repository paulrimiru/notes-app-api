import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

interface CreateOptions {
  checkUnique?: string[];
}

export async function createRecord<T>(repository: Repository<T>, item: T, options?: CreateOptions) {
  if (options?.checkUnique) {
    const [key, value, message] = options.checkUnique;
    const existing = await repository.findOne({ [key]: value });

    if (existing) {
      throw new HttpException(
        message || `value ${key} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  return await repository.save(item);
}

export async function updateRecord<T>(repository: Repository<T>, item: T) {
  return await repository.save(item);
}

export async function deleteRecord<T>(repository: Repository<T>, id: string) {
  await repository.delete(id);
  return id;
}

export async function getRecord<T>(repository: Repository<T>, id?: string) {
  if (id) {
    const item = await repository.findOne(id);

    if (!item) {
      throw new NotFoundException('record with value ' + id + ' not found');
    }

    return item;
  }

  return await repository.find();
}

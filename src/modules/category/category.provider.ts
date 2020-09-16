import { Connection } from 'typeorm';

import { Category } from '@/entities/category.entity';
import { CATEGORY_REPOSITORY, DATABASE_CONNECTION } from '@/utils/constants';

export const categoryProviders = [
  {
    provide: CATEGORY_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Category),
    inject: [DATABASE_CONNECTION],
  },
];

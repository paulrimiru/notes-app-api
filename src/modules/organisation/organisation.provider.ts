import { Connection } from 'typeorm';

import { Organization } from '@/entities/organisation.entity';
import { ORGANISATION_REPOSITORY, DATABASE_CONNECTION } from '@/utils/constants';

export const organisationProviders = [
  {
    provide: ORGANISATION_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Organization),
    inject: [DATABASE_CONNECTION],
  },
];

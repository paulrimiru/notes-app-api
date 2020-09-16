import { Connection } from 'typeorm';

import { NOTE_REPOSITORY, DATABASE_CONNECTION } from '@/utils/constants';
import { Note } from '@/entities/note.entity';

export const noteProviders = [
  {
    provide: NOTE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Note),
    inject: [DATABASE_CONNECTION],
  },
];

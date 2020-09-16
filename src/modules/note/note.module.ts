import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { NoteController } from './note.controller';
import { noteProviders } from './notes.provider';
import { NoteService } from './note.service';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [DatabaseModule, CategoryModule],
  controllers: [NoteController],
  providers: [...noteProviders, NoteService],
})
export class NoteModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { noteProviders } from '../note/notes.provider';
import { OrganisationModule } from '../organisation/organisation.module';
import { CategoryController } from './category.controller';
import { categoryProviders } from './category.provider';
import { CategoryService } from './category.service';

@Module({
  imports: [DatabaseModule, OrganisationModule],
  controllers: [CategoryController],
  providers: [...categoryProviders, ...noteProviders, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}

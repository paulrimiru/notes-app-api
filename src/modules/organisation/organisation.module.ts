import { Module } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { DatabaseModule } from '../db/database.module';
import { UserModule } from '../user/user.module';
import { OrganisationController } from './organisation.controller';
import { organisationProviders } from './organisation.provider';
import { OrganizationService } from './organisation.service';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [OrganisationController],
  providers: [...organisationProviders, OrganizationService],
  exports: [OrganizationService],
})
export class OrganisationModule {}

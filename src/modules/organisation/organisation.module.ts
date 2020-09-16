import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { UserModule } from '../user/user.module';
import { OrganisationController } from './organisation.controller';
import { organisationProviders } from './organisation.provider';
import { OrganizationService } from './organisation.service';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [OrganisationController],
  providers: [...organisationProviders, OrganizationService],
})
export class OrganisationModule {}

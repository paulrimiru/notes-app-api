import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { CreateOrganisationDto, DeleteOrganisationDto, UpdateOrganisationDto } from './validation.dt';
import { OrganizationService } from './organisation.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('organisation')
export class OrganisationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  async createOrganisation(@Req() request: any, @Body() organisation: CreateOrganisationDto) {
    return classToPlain(await this.organizationService.createOrganisation(request.user.id, organisation));
  }

  @Put()
  async updateOrganisation(@Req() request: any, @Body() organization: UpdateOrganisationDto) {
    return classToPlain(await this.organizationService.updateOrganisation(request.user.id, organization));
  }

  @Delete()
  async deleteOrganisation(@Req() request: any, @Param('id') id: string) {
    return classToPlain(await this.organizationService.deleteOrganisation(request.user.id, id));
  }

  @Get(':id?')
  async getOrganisation(@Req() request: any, @Param('id') id?: string) {
    return classToPlain(await this.organizationService.getOrganisations(request.user.id, id));
  }
}

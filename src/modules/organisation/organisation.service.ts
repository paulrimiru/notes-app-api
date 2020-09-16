import { Organization } from '@/entities/organisation.entity';
import { ORGANISATION_REPOSITORY } from '@/utils/constants';
import { createRecord, deleteRecord, getRecord, updateRecord } from '@/utils/crud';
import { Inject, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateOrganisationDto, UpdateOrganisationDto } from './validation.dt';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(ORGANISATION_REPOSITORY)
    private readonly organisationRepository: Repository<Organization>,
    private readonly userService: UserService,
  ) {}

  async createOrganisation(id: string, organization: CreateOrganisationDto) {
    const org = new Organization();
    org.name = organization.name;

    const createdOrg = await createRecord(this.organisationRepository, org);
    const user = await this.userService.findById(id);
    user.ownedOrganisations = [...user.ownedOrganisations, createdOrg];

    this.userService.updateUser(user);
    return createdOrg;
  }

  async updateOrganisation(userId: string, organisationUpdate: UpdateOrganisationDto) {
    const organisation = await getRecord(this.organisationRepository, organisationUpdate.id) as Organization;
    const owner = await organisation.owner;

    if (owner.id !== userId) {
      throw new UnauthorizedException('unauthorized operation')
    }

    if (organisationUpdate.name) {
      organisation.name = organisationUpdate.name;
    }

    if (organisationUpdate.members && organisationUpdate.members.length) {
      const members = await this.userService.findManyByEmail(organisationUpdate.members);
      const updatedMembers = members.map(member => {
        member.organisations = [...member.organisations, organisation];
        return member;
      });
      this.userService.updateManyUsers(updatedMembers);
    }

    return await updateRecord(this.organisationRepository, organisation);
  }

  async getOrganisations(userId: string, id?: string) {
    const user = await this.userService.findById(userId);

    const orgs = [...user.ownedOrganisations, ...user.organisations]

    if (id) {
      const org = orgs.find(orgin => orgin.id === id)

      if (!org) {
        throw new NotFoundException(`organisation not found`);
      }

      return org
    }
    return orgs;
  }

  async deleteOrganisation(userId: string, id: string) {
    const organisation = await getRecord(this.organisationRepository, id) as Organization;
    const owner = await organisation.owner;

    if (owner.id !== userId) {
      throw new UnauthorizedException('unauthorized operation')
    }

    return await deleteRecord(this.organisationRepository, id);
  }
}

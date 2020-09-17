import { Category } from '@/entities/category.entity';
import { Note } from '@/entities/note.entity';
import { Organization } from '@/entities/organisation.entity';
import { CATEGORY_REPOSITORY, NOTE_REPOSITORY } from '@/utils/constants';
import { createRecord, deleteRecord, getRecord, updateRecord } from '@/utils/crud';
import { Inject, Injectable, UnauthorizedException, NotFoundException, Logger } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { In, Repository } from 'typeorm';
import { NoteService } from '../note/note.service';
import { OrganizationService } from '../organisation/organisation.service';
import { CreateCategoryDto, UpdateCategoryDto } from './validation.dt';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(NOTE_REPOSITORY)
    private readonly noteRepository: Repository<Note>,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: Repository<Category>,
    private readonly organisationService: OrganizationService,
  ) {}

  private readonly logger = new Logger(CategoryService.name);


  async createCategory(id: string, categoryDto: CreateCategoryDto) {
    const organisation = await this.organisationService.getOrganisations(id, categoryDto.organisationId) as Organization;
    const category = new Category();
    category.organization = organisation;
    category.name = categoryDto.name;

    return await createRecord(this.categoryRepository, category);
  }

  async updateCategory(userId: string, categoryUpdate: UpdateCategoryDto) {
    const category = await getRecord(this.categoryRepository, categoryUpdate.id) as Category;

    if (categoryUpdate.name) {
      category.name = categoryUpdate.name;
    }

    if (categoryUpdate.notes && categoryUpdate.notes.length) {
      const notes = await this.noteRepository.find({ id: In(categoryUpdate.notes) });
      category.notes = notes;
    }

    return await updateRecord(this.categoryRepository, category);
  }

  async getCategorys(id?: string) {
    return await getRecord(this.categoryRepository, id);
  }

  async getOrganisationCategories(userId: string, orgId: string) {
    const organisation = await this.organisationService.getOrganisations(userId, orgId) as Organization;
    const categories = await organisation.categories;
    return categories;
  }

  async deleteCategory(userId: string, id: string) {
    return await deleteRecord(this.categoryRepository, id);
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { CreateCategoryDto, UpdateCategoryDto } from './validation.dt';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Req() request: any, @Body() category: CreateCategoryDto) {
    return classToPlain(await this.categoryService.createCategory(request.user.id, category));
  }

  @Put()
  async updateCategory(@Req() request: any, @Body() category: UpdateCategoryDto) {
    return classToPlain(await this.categoryService.updateCategory(request.user.id, category));
  }

  @Delete()
  async deleteCategory(@Req() request: any, @Param('id') id: string) {
    return classToPlain(await this.categoryService.deleteCategory(request.user.id, id));
  }

  @Get(':id?')
  async getCategory(@Req() request: any, @Param('id') id?: string) {
    return classToPlain(await this.categoryService.getCategorys(id));
  }
}

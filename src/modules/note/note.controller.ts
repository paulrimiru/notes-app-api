import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { CreateNoteDto, UpdateNoteDto } from './validation.dt';
import { NoteService } from './note.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async createNote(@Req() request: any, @Body() note: CreateNoteDto) {
    return classToPlain(await this.noteService.createNote(note));
  }

  @Put()
  async updateNote(@Req() request: any, @Body() note: UpdateNoteDto) {
    return classToPlain(await this.noteService.updateNote(note));
  }

  @Delete()
  async deleteNote(@Req() request: any, @Param('id') id: string) {
    return classToPlain(await this.noteService.deleteNote(id));
  }

  @Get(':id?')
  async getNote(@Req() request: any, @Param('id') id?: string) {
    return classToPlain(await this.noteService.getNotes(id));
  }
}

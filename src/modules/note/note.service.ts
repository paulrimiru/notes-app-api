import { Category } from '@/entities/category.entity';
import { Note } from '@/entities/note.entity';
import { NOTE_REPOSITORY } from '@/utils/constants';
import { createRecord, deleteRecord, getRecord, updateRecord } from '@/utils/crud';
import { Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CreateNoteDto, UpdateNoteDto } from './validation.dt';

@Injectable()
export class NoteService {
  constructor(
    @Inject(NOTE_REPOSITORY)
    private readonly noteRepository: Repository<Note>,
    private readonly categoryService: CategoryService,
  ) {}

  async createNote(noteDto: CreateNoteDto) {
    const category = await this.categoryService.getCategorys(noteDto.categoryId) as Category;

    const note = new Note();
    note.name = noteDto.name;
    note.category = category;

    return await createRecord(this.noteRepository, note);
  }

  async updateNote(noteUpdate: UpdateNoteDto) {
    const note = await getRecord(this.noteRepository, noteUpdate.id) as Note;
    note.notes = noteUpdate.note;

    return await updateRecord(this.noteRepository, note);
  }

  async getNotes(id?: string) {
    return await getRecord(this.noteRepository, id);
  }

  async getcategoryNotes(id: string) {
    const notes = await this.noteRepository.find({
      where: { category: { id }},
    });

    return notes;
  }

  async deleteNote(id: string) {
    return await deleteRecord(this.noteRepository, id);
  }

}

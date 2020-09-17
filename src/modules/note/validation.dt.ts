import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  name: string;

  note: string;

  @IsNotEmpty()
  @IsUUID('4')
  categoryId: string;
}

// tslint:disable-next-line: max-classes-per-file
export class UpdateNoteDto {
  @IsNotEmpty()
  @IsUUID('4')
  id: string;

  note: string;
}

// tslint:disable-next-line: max-classes-per-file
export class DeleteNoteDto {
  @IsNotEmpty()
  @IsUUID('4')
  id: string;
}

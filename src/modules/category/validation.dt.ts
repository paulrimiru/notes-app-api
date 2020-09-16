import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsUUID('4')
  organisationId: string;
}

// tslint:disable-next-line: max-classes-per-file
export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsUUID('4')
  id: string;

  name?: string;

  notes?: string[];
}

// tslint:disable-next-line: max-classes-per-file
export class DeleteCategoryDto {
  @IsNotEmpty()
  @IsUUID('4')
  id: string;
}

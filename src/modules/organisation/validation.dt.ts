import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrganisationDto {
  @IsNotEmpty()
  name: string;
}

// tslint:disable-next-line: max-classes-per-file
export class UpdateOrganisationDto {
  @IsNotEmpty()
  @IsUUID('4')
  id: string;

  name?: string;

  members?: string[];
}

// tslint:disable-next-line: max-classes-per-file
export class DeleteOrganisationDto {
  @IsNotEmpty()
  @IsUUID('4')
  id: string;
}

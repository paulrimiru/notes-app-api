import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base';
import { Note } from './note.entity';
import { Organization } from './organisation.entity';

@Entity()
export class Category extends Base {
  @Column()
  name: string;

  @ManyToOne(() => Organization, organisation => organisation.categories, { eager: true })
  organization: Organization;

  @OneToMany(() => Note, note => note.category)
  notes: Note[];
}

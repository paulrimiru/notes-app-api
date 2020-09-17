import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './base';
import { Category } from './category.entity';

@Entity()
export class Note extends Base {
  @Column()
  name: string;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => Category, category => category.notes, { eager: true })
  category: Category;
}

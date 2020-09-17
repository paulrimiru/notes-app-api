import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base';
import { Category } from './category.entity';
import { User } from './user.entity';

@Entity()
export class Organization extends Base {
  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => User, user => user.ownedOrganisations)
  owner: Promise<User>;

  @ManyToMany(() => User, user => user.organisations)
  members: Promise<User[]>;

  @OneToMany(() => Category, category => category.organization, { onDelete: 'CASCADE' })
  categories: Promise<Category[]>;
}

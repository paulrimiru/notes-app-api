import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { Base } from './base';
import { User } from './user.entity';

@Entity()
export class Organization extends Base {
  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => User, user => user.ownedOrganisations)
  owner: Promise<User>;

  @ManyToMany(() => User, user => user.organisations)
  members: Promise<User[]>;
}

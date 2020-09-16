import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import { genSalt, hash, compare } from 'bcrypt';

import { Base } from './base';
import { Organization } from './organisation.entity';

export enum Role {
  Admin = 'admin',
  User = 'user',
  Unverified = 'un-verified',
}

@Entity()
export class User extends Base {
  @Column()
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({
    default: false,
  })
  @Exclude({
    toPlainOnly: true,
  })
  verified: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Unverified,
  })
  @Exclude({
    toPlainOnly: true,
  })
  role: Role;

  @OneToMany(() => Organization, organisation => organisation.owner, { eager: true })
  ownedOrganisations: Organization[];

  @ManyToMany(() => Organization, organisation => organisation.members, { eager: true })
  @JoinTable()
  organisations: Organization[];

  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  protected password: string;

  async setPassword(password) {
    const salt = await genSalt(10);
    this.password = await hash(password, salt);
  }

  async checkPassword(password) {
    return await compare(password, this.password);
  }
}

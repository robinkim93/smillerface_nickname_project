import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'nicknames' })
export class Nicknames extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  nickname: string;
}

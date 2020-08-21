import { Column, BeforeUpdate, BeforeInsert } from 'typeorm';

export default class BaseEntity {
  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @BeforeUpdate()
  update(): void {
    this.updated_at = new Date();
  }

  @BeforeInsert()
  insert(): void {
    this.created_at = new Date();
  }
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from './BaseEntity';

@Entity('categories')
class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;
}

export default Category;

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Category from './Category';
import BaseEntity from './BaseEntity';

@Entity('transactions')
class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column('double precision')
  value: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: string;
}

export default Transaction;

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  amount: number;
  //eager true here if you want all the categories for the user (in the user entity- ONe to many)
  @ManyToOne(() => Category, (category) => category.entries)
  category: Category;
}

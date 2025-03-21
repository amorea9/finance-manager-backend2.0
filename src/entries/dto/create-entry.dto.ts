import { Category } from '../../categories/entities/category.entity';

export class CreateEntryDto {
  title: string;
  amount: number;
  date: string;
  paymentMethod: string;
  currency: string;
  category: Category;
}

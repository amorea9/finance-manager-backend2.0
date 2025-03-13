import { Category } from "../../categories/entities/category.entity"

export class CreateEntryDto {
    title: string

    amount: number

    category: Category
}

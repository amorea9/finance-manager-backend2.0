import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
//import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(createCategoryDto);
  }

  isAdult(age: number): boolean {
    // if(age < 0) {
    //   throw new Error('Age cannot be negative')
    // }
    return age > 18;
  }

  async findAll() {
    return await this.categoryRepository.find({});
  }

  async findOne(id: number): Promise<Category> {
    const categoryToFind = await this.categoryRepository.findOne({
      where: { id: id },
    });
    return categoryToFind;
  }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  async remove(id: number): Promise<Category | string> {
    const categoryToRemove = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!categoryToRemove) {
      throw new Error('Category not found');
    }
    console.log('removing', categoryToRemove);
    await this.categoryRepository.remove(categoryToRemove);
    return `This category has been deleted ${categoryToRemove.id} ${categoryToRemove.title}`;
  }
}

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(id: number) {
    return this.categoriesService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
  //   return this.categoriesService.update(+id, updateCategoryDto);
  //}

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const category = await this.categoriesService.remove(+id);
      if (!category) {
        return { message: 'Category not found' }; // Ensure a JSON response
      }
      return { message: `Category with id ${id} successfully removed` };
    } catch (error) {
      return { message: `Error deleting category: ${error}` }; // Handle error as JSON
    }
  }
}

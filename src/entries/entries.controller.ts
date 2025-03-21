import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
// import { UpdateEntryDto } from './dto/update-entry.dto';
// import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
// import { PremiumUserGuard } from '../authentication/premium-user.guard';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  create(@Body() createEntryDto: CreateEntryDto) {
    return this.entriesService.create(createEntryDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard, PremiumUserGuard)
  findAll() {
    return this.entriesService.findAll();
  }

  @Get(':id')
  async findOne(id: string) {
    return await this.entriesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
  //   return this.entriesService.update(+id, updateEntryDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const entry = await this.entriesService.remove(+id);
      if (!entry) {
        return { message: 'Entry not found' }; // Ensure a JSON response
      }
      return { message: `Entry with id ${id} successfully removed` };
    } catch (error) {
      return { message: `Error deleting entry: ${error}` }; // Handle error as JSON
    }
  }
}

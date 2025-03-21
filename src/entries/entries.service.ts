import { Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
// import { UpdateEntryDto } from './dto/update-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry) private entryRepository: Repository<Entry>,
  ) {}

  async create(createEntryDto: CreateEntryDto) {
    return await this.entryRepository.save(createEntryDto);
  }

  async findAll() {
    return await this.entryRepository.find({});
  }

  async findOne(id: number): Promise<Entry> {
    const entryToFind = await this.entryRepository.findOne({
      where: { id: id },
    });
    return entryToFind;
  }

  // update(id: number, updateEntryDto: UpdateEntryDto) {
  //   return `This action updates a #${id} entry`;
  // }

  async remove(id: number): Promise<Entry | string> {
    const entryToRemove = await this.entryRepository.findOne({
      where: { id },
    });
    if (!entryToRemove) {
      throw new Error('Category not found');
    }
    console.log('removing', entryToRemove);
    await this.entryRepository.remove(entryToRemove);
    return `This category has been deleted ${entryToRemove.id} ${entryToRemove.title}`;
  }
}

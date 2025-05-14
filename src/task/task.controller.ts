import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/file-upload/file-upload.service';

@Controller('/api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get(':id/files')
  async getFiles(@Param('id') id: string) {
    return this.taskService.getFiles(+id);
  }
  @Post(':id/files')
  @UseInterceptors(
    FileInterceptor(
      'file',
      new UploadService().getMulterOptions('files', 'file'),
    ),
  )
  @Post(':id/files')
  async uploadFile(
    @Param('id')
    id: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    return this.taskService.uploadFile(+id, file, req.user.id);
  }
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
    return this.taskService.create(createTaskDto, req.user.id);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.taskService.findAll(req.user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}

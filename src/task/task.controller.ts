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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/api/tasks')
@ApiTags('Tasks') // Group in Swagger UI
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id/files')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get files for a task' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'List of files for the task' })
  async getFiles(@Param('id') id: string) {
    return this.taskService.getFiles(+id);
  }

  @Post(':id/files')
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor(
      'file',
      new UploadService().getMulterOptions('files', 'file'),
    ),
  )
  @ApiOperation({ summary: 'Upload a file to a task' })
  @ApiParam({ name: 'id', type: Number })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    return this.taskService.uploadFile(+id, file, req.user.id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
    return this.taskService.create(createTaskDto, req.user.id);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all tasks for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of tasks' })
  findAll(@Req() req: any) {
    return this.taskService.findAll(req.user);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}

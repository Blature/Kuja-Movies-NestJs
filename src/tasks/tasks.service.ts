import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id, user } });
    if (!found) throw new NotFoundException(`Task with id "${id}" not found!`);
    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    const tasks = this.getAllTasks();
    if (result.affected === 0)
      throw new NotFoundException(`Task with id "${id}" not found!`);
  }

  async deleteAllTasks(): Promise<void> {
    const find = await this.tasksRepository.find({ deletable: true });
    for (let dlt of find) this.tasksRepository.delete(dlt.id);
  }

  async updateTaskById(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../project/entities/project.entity';
// import { ProjectModule } from '../project/project.module';
import { ProjectService } from '../project/project.service';
import { Repository } from 'typeorm';
import { EmployeeCreateDTO } from './dto/create-employee.input';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private projectService: ProjectService,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }
  async findOne(id: string) {
    return this.employeeRepository.findOne(id);
  }

  async create(employee: EmployeeCreateDTO): Promise<Employee> {
    const emp = this.employeeRepository.create(employee);
    console.log(
      '🚀 ~ file: employee.service.ts ~ line 27 ~ EmployeeService ~ create ~ emp',
      emp,
    );
    return this.employeeRepository.save(emp);
  }

  async getProject(id: string): Promise<Project> {
    return this.projectService.findOne(id);
  }
}

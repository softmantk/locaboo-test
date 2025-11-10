import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../../shared/dto/pagination-query.dto';

export class CreateUserDto {
  @IsString()
  email: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class FindusersQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsIn(['id', 'email','createdAt'])
  sortBy?: string = 'createdAt';

  @IsOptional()
  email?: string;

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;
}

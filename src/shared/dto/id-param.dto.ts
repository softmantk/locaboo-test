import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class IdParamDto {
  @Type(() => Number)
  @IsInt()
  id: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class TaskDTO {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The name of the task position',
  })
  readonly name: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'The time of the task position',
  })
  readonly time: number;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The project of the task position',
  })
  readonly projectId: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The worker of the task position',
  })
  readonly workerId: string;
}

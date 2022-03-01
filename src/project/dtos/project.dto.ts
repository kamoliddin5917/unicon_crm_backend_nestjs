import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class ProjectDTO {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The name of the project position',
  })
  readonly name: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The org of the project position',
  })
  readonly orgId: string;
}

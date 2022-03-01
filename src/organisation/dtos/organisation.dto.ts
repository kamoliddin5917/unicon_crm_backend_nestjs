import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class OrganisationDTO {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The name of the login position',
  })
  readonly name: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The adminId of the login position',
  })
  readonly adminId: string;
}

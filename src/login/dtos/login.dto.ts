import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The username of the login position',
  })
  readonly username: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The password of the login position',
  })
  readonly password: string;
}

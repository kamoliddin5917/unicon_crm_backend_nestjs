import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class AdminDTO {
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

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The role of the login position',
  })
  readonly roleId: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The organisation of the login position',
  })
  readonly organisationId: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The adminId of the login position',
  })
  readonly adminId: string;
}

export class refDTO {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The organisation of the referenses user position',
  })
  readonly organisationId: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The user of the referenses organisation position',
  })
  readonly userId: string;
}

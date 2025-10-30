import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'Email do utilizador',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'admin123',
    minLength: 6,
    description: 'Palavra-passe do utilizador',
  })
  @IsString()
  @MinLength(6)
  password!: string;
}

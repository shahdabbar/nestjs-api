import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*/, {
    message: 'Please enter a strong password!',
  })
  public password: string;

  @IsNotEmpty()
  @MaxLength(16)
  public firstName: string;

  @IsNotEmpty()
  @MaxLength(16)
  public lastName: string;
}

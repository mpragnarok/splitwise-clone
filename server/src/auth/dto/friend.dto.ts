import { IsEmail, IsNumber, IsOptional } from 'class-validator';

class GetFriendBaseDto {
  @IsNumber()
  id: number;
}

export class AddFriendDto {
  @IsEmail()
  email: string;
}

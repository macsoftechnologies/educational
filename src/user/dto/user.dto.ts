import { ApiProperty } from '@nestjs/swagger';
export class userDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  mobileNum: string;
  @ApiProperty()
  emailId: string;
  @ApiProperty()
  token: string;
}

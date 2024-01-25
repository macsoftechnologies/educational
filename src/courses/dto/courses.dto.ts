import { ApiProperty } from '@nestjs/swagger';

export class coursesDto {
  @ApiProperty()
  courseId: string;
  @ApiProperty()
  courseName: string;
  @ApiProperty()
  image: string;
}

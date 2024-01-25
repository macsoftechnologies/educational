import { ApiProperty } from '@nestjs/swagger';

export class examsDto {
  @ApiProperty()
  examId: string;
  @ApiProperty()
  examName: string;
  @ApiProperty()
  image: string;
}

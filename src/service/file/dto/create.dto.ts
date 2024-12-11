import { ApiProperty } from '@nestjs/swagger';

export class CreateCanvasDto {
  @ApiProperty()
  text: string;
}

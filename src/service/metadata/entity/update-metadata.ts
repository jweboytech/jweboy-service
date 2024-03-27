import { ApiProperty } from '@nestjs/swagger';

export class UpdateMetadata {
  @ApiProperty()
  id: number;
}

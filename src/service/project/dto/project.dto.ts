import { ApiProperty } from '@nestjs/swagger';

export class QueryProjectDto {
  @ApiProperty()
  category: number;
}

export class DeleteProjectDto {
  @ApiProperty()
  id: number;
}

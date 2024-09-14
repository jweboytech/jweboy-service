import { ApiProperty } from '@nestjs/swagger';
import { ProjectType } from '../entity/project.entity';

export class QueryProjectDto {
  @ApiProperty()
  category: number;

  @ApiProperty()
  isPublic: boolean;

  @ApiProperty({ default: ProjectType.Miniprogram })
  type: ProjectType;
}

export class DeleteProjectDto {
  @ApiProperty()
  id: number;
}

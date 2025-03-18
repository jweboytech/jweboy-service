import { ApiProperty } from '@nestjs/swagger';
import { RedNoteCategory } from '../entity/rednote.entity';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: File;

  @ApiProperty({ type: 'enum', enum: RedNoteCategory })
  category: RedNoteCategory;
}

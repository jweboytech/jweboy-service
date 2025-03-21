import { ApiProperty } from '@nestjs/swagger';
import { RedNoteCategory } from '../entity/rednote.entity';

export class CreateRedNoteDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ name: 'publish_date' })
  publishDate: string;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  images: string[];

  @ApiProperty()
  href: string;

  @ApiProperty({ type: 'enum', enum: RedNoteCategory })
  category: RedNoteCategory;
}

export class UpdateRedNoteDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ name: 'publish_date' })
  publishDate: string;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  images: string[];

  @ApiProperty()
  href: string;

  @ApiProperty({ type: 'enum', enum: RedNoteCategory })
  category: RedNoteCategory;
}

export class RedNoteQuery {
  @ApiProperty({ required: false })
  specifiedCondition: string;

  @ApiProperty({ required: false })
  partiallyFriendly: string;

  @ApiProperty({ required: false })
  prohibitLanding: string;

  @ApiProperty({ required: false })
  allowLanding: string;

  @ApiProperty({ required: false })
  washrooms: string;

  @ApiProperty({ required: false })
  parking: string;
}

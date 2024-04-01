import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlatform {
  @ApiProperty()
  id: number;
}

export class PlatformQuery {
  @ApiProperty({ required: false })
  type: string;

  @ApiProperty({ required: false })
  keyword: string;
}

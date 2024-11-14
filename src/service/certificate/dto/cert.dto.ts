import { ApiProperty } from '@nestjs/swagger';

export class AddCertDto {
  @ApiProperty()
  domain: string;

  @ApiProperty()
  generationDate: Date;

  @ApiProperty()
  expirationDate: Date;
}

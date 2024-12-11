import { ApiProperty } from '@nestjs/swagger';

export class AddCertDto {
  @ApiProperty()
  domain: string;

  @ApiProperty()
  generationDate: Date;

  @ApiProperty()
  expirationDate: Date;
}

export class UpdateCertDto {
  @ApiProperty()
  domain: string;
}

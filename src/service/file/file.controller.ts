import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCanvasDto } from './dto/create.dto';
import * as QRCode from 'qrcode';

@ApiTags('File')
@Controller('file')
export class FileController {
  @Post('qrcode')
  @HttpCode(HttpStatus.OK)
  generateCanvas(@Body() dto: CreateCanvasDto) {
    return QRCode.toDataURL(dto.text, {
      errorCorrectionLevel: 'H', // 错误纠正级别：L, M, Q, H（H 为最高级别）
      scale: 10, // 缩放倍数，值越大，颗粒度越密
      margin: 2, // 二维码边距
    });
  }
}

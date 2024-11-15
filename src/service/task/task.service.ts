import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CertificateService } from '../certificate/certificate.service';
import * as dayjs from 'dayjs';
import { notifyDomainAlmostExpired } from 'src/utils/webhook';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private readonly certificateService: CertificateService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCron() {
    const today = dayjs();
    const [list] = await this.certificateService.findAll();
    const almostExpireList = list.filter(
      (item) => dayjs(item.expirationDate).diff(today, 'days') < 30,
    );
    await notifyDomainAlmostExpired(almostExpireList);
    this.logger.debug('feishu webhook is trigger');
  }
}

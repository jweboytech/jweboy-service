import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { CertificateModule } from '../certificate/certificate.module';

@Module({
  imports: [CertificateModule],
  providers: [TaskService],
})
export class TaskModule {}

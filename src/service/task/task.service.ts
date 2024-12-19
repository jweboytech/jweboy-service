import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CertificateService } from '../certificate/certificate.service';
import * as dayjs from 'dayjs';
import { notifyDomainAlmostExpired, notifyDuckPost } from 'src/utils/webhook';
import { chromium } from 'playwright';

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

  @Cron(CronExpression.EVERY_30_MINUTES)
  async screen() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://eleduck.com/search?keyword=java', {
      waitUntil: 'load',
    });

    // 等待 .post-item 元素加载完成
    await page.waitForSelector('.post-item', { state: 'attached' });

    const backItems = await page.locator('.post-item').evaluateAll((nodes) =>
      nodes.map((node) => {
        const title = node.querySelector('.post-title');
        const slug = node.querySelector('a').getAttribute('href');

        return {
          title: title.textContent.trim(),
          url: `https://eleduck.com${slug}`,
          scope: '后端',
        };
      }),
    );

    await page.goto('https://eleduck.com/search?keyword=%E5%89%8D%E7%AB%AF', {
      waitUntil: 'load',
    });

    // 等待 .post-item 元素加载完成
    await page.waitForSelector('.post-item', { state: 'attached' });
    // 查询最新数据
    // await page.click('.ant-dropdown-trigger');
    // const secondItem = page.locator('.ant-dropdown-menu-item:nth-of-type(2)');
    // await secondItem.click();

    const frontItems = await page.locator('.post-item').evaluateAll((nodes) =>
      nodes.map((node) => {
        const title = node.querySelector('.post-title');
        const slug = node.querySelector('a').getAttribute('href');

        return {
          title: title.textContent.trim(),
          url: `https://eleduck.com${slug}`,
          scope: '前端',
        };
      }),
    );

    const lastFrontItem = frontItems[0];
    const lastBackItem = backItems[0];

    await browser.close(); // 关闭浏览器
    await notifyDuckPost([lastFrontItem, lastBackItem]);
  }
}

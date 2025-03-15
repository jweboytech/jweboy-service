import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CertificateService } from '../certificate/certificate.service';
import * as dayjs from 'dayjs';
import {
  notifyDomainAlmostExpired,
  notifyDuckPost,
  notifyProducthunt,
} from 'src/utils/webhook';
import { chromium } from 'playwright';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private readonly certificateService: CertificateService) {}

  // @Cron(CronExpression.EVERY_DAY_AT_1AM)
  // async handleCron() {
  //   const today = dayjs();
  //   const [list] = await this.certificateService.findAll();
  //   const almostExpireList = list.filter(
  //     (item) => dayjs(item.expirationDate).diff(today, 'days') < 30,
  //   );
  //   await notifyDomainAlmostExpired(almostExpireList);
  //   this.logger.debug('feishu webhook is trigger');
  // }

  // @Cron(CronExpression.EVERY_30_MINUTES)
  // async screen() {
  //   const browser = await chromium.launch();
  //   const page = await browser.newPage();

  //   await page.goto('https://eleduck.com/search?keyword=java', {
  //     waitUntil: 'load',
  //   });

  //   // 等待 .post-item 元素加载完成
  //   await page.waitForSelector('.post-item', { state: 'attached' });

  //   const backItems = await page.locator('.post-item').evaluateAll((nodes) =>
  //     nodes.map((node) => {
  //       const title = node.querySelector('.post-title');
  //       const slug = node.querySelector('a').getAttribute('href');

  //       return {
  //         title: title.textContent.trim(),
  //         url: `https://eleduck.com${slug}`,
  //         scope: '后端',
  //       };
  //     }),
  //   );

  //   await page.goto('https://eleduck.com/search?keyword=%E5%89%8D%E7%AB%AF', {
  //     waitUntil: 'load',
  //   });

  //   // 等待 .post-item 元素加载完成
  //   await page.waitForSelector('.post-item', { state: 'attached' });
  //   // 查询最新数据
  //   // await page.click('.ant-dropdown-trigger');
  //   // const secondItem = page.locator('.ant-dropdown-menu-item:nth-of-type(2)');
  //   // await secondItem.click();

  //   const frontItems = await page.locator('.post-item').evaluateAll((nodes) =>
  //     nodes.map((node) => {
  //       const title = node.querySelector('.post-title');
  //       const slug = node.querySelector('a').getAttribute('href');

  //       return {
  //         title: title.textContent.trim(),
  //         url: `https://eleduck.com${slug}`,
  //         scope: '前端',
  //       };
  //     }),
  //   );

  //   const lastFrontItem = frontItems[0];
  //   const lastBackItem = backItems[0];

  //   await browser.close(); // 关闭浏览器
  //   await notifyDuckPost([lastFrontItem, lastBackItem]);
  // }

  // @Cron(CronExpression.EVERY_SECOND)
  // async spiderProducthunt() {
  //   const browser = await chromium.launch();
  //   const page = await browser.newPage();

  //   // 等待页面加载完成
  //   await page.goto('https://www.producthunt.com', { waitUntil: 'load' });

  //   // 获取今日最新 10 条
  //   const container = await page.locator('[data-test=homepage-section-0]');
  //   const items = await container
  //     .locator('[data-test^="post-item-"]')
  //     .evaluateAll((nodes) =>
  //       nodes.map((node) => {
  //         const titleNode = node.querySelector(
  //           '[data-test^="post-name-"]',
  //         ) as HTMLElement;
  //         const descNode = node.querySelectorAll('a')[2] as HTMLElement;
  //         const logoNode = node.querySelector('img') as HTMLImageElement;
  //         const voteNode = node.querySelector(
  //           'button[data-test="vote-button"]',
  //         ) as HTMLButtonElement;
  //         const tagsNode = node.querySelectorAll('a[target="_blank"]');

  //         return {
  //           title: titleNode.innerText.split('. ')[1],
  //           description: descNode.innerText,
  //           vote: +voteNode.innerText,
  //           logo: logoNode?.src,
  //           tags: Array.from(tagsNode).map((item) => item.innerHTML),
  //         };
  //       }),
  //     );
  //   // console.log(items);

  //   await notifyProducthunt(items);

  //   await browser.close(); // 关闭浏览器
  // }
}

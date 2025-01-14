import { Certificate } from 'src/service/certificate/entity/certificate.entity';
import { FEISHU_REQUEST_URL } from '../constants';
import { request } from 'undici';
import * as dayjs from 'dayjs';

export const notifyDomainAlmostExpired = (data: Certificate[]) => {
  const today = dayjs();

  return request(FEISHU_REQUEST_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      msg_type: 'post',
      content: {
        post: {
          zh_cn: {
            title: '域名即将过期通知',
            content: [
              data.map((item) => {
                const restDays = dayjs(item.expirationDate).diff(today, 'days');
                return {
                  text: `${item.domain} 证书还剩${restDays}天过期`,
                  tag: 'text',
                };
              }),
            ],
          },
        },
      },
    }),
  });
};

export const notifyDuckPost = (data: any) => {
  return request(FEISHU_REQUEST_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      msg_type: 'post',
      content: {
        post: {
          zh_cn: {
            title: '电鸭职位订阅',
            content: [
              data.map((item) => {
                return {
                  text: `${item.scope}\n${item.title}，详情点击 ${item.url}\n`,
                  tag: 'text',
                };
              }),
            ],
          },
        },
      },
    }),
  });
};

export const notifyProducthunt = (data: any) => {
  return request(FEISHU_REQUEST_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      msg_type: 'interactive',
      card: {
        header: {
          title: { content: 'Producthunt 榜单', tag: 'plain_text' },
        },
        elements: [
          ...data.map((item) => ({
            tag: 'div',
            text: {
              content: `**${item.title} https://www.google.com/search?q=${
                item.title
              } **<br />描述: ${item.description}<br />标签: ${item.tags.join(
                ' | ',
              )}<br />投票数: ${item.vote}<br />`,
              tag: 'lark_md',
            },
          })),
          {
            tag: 'action',
            actions: [
              {
                tag: 'button',
                text: {
                  content: 'Producthunt :玫瑰:',
                  tag: 'lark_md',
                },
                url: 'https://www.producthunt.com',
                type: 'default',
                value: {},
              },
            ],
          },
        ],
      },
    }),
  });
};

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

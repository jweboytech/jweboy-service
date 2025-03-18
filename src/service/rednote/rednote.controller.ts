import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileUploadDto } from './dto/file.dto';
import { RednoteService } from './rednote.service';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { RedNoteCategory } from './entity/rednote.entity';
import { CreateRedNoteDto } from './dto/rednote.dto';

@Controller('rednote')
export class RednoteController {
  constructor(private readonly service: RednoteService) {}

  @Post('batch/import')
  @ApiConsumes('multipart/form-data') // 指定请求内容类型为文件上传
  @ApiBody({ type: FileUploadDto })
  @UseInterceptors(FileInterceptor('file')) // 使用 multer 文件拦截器
  async uploadPem(@UploadedFile() file: Express.Multer.File) {
    const json = file.buffer.toString();
    const items = JSON.parse(json).map((item) => ({
      category: RedNoteCategory.PET_FRIENDLY,
      ...item,
    })) as CreateRedNoteDto[];

    await this.service.insertOne(items);
  }

  @Get('all')
  findAll() {
    return this.service.findAll();
  }

  @Post('add')
  async insertOne() {
    await this.service.insertOne({
      category: RedNoteCategory.PET_FRIENDLY,
      description:
        '此帖记录杭州这个宠物不友好城市里适合狗狗玩的好去处，都是我自己带狗去过以后的真实感受，也欢迎大家推荐\n1️⃣PETSMILE（亚运村店）\n地址：萧山区共建路1号\n价格： 68元/狗\n有一块很大的宠物友好草坪可以供狗狗玩，有供主人们坐的椅子。周末各种品种的狗狗在这里聚会，而且都非常友好。旁边还有露营场所、钓鱼、烧烤的地方，是个远离城市的世外桃源。\n2️⃣佩多福宠物俱乐部\n地址：上城区俞章东路108号3号楼\n价格：35.9 元/狗，送一杯手磨美式或拿铁\n草坪分为小型犬区和大型犬舍区，小型犬区有点小，有一些狗狗玩乐的设施，工作人员挺负责的，有主人坐的帐篷和椅子，咖啡好喝，可以待一下午。周边是城中村，有点乱。\n3️⃣钱江世纪城里的斜坡草坪\n地址：钱江世纪城公园\n价格：免费\n到了20:30左右狗狗逐渐增多。狗友们都非常自觉，狗狗拉屎都会及时处理掉。\n4️⃣良渚玉鸟集\n地址：余杭区良渚文化村良渚街道\n价格：免费\n玉鸟集的草坪很好，餐厅和店铺基本都是狗狗友好，或者提供笼子可以寄养狗狗，笼子都很干净。\n5️⃣千岛湖理想花园\n地址：淳安县环左线\n价格：38/人送一杯咖啡\n超级大的草坪，可以让狗狗狂奔，环境也很好，唯一要小心老鹰🦅如果是小狗的话，要看住自己的小狗哦，我们看到好几只老鹰在天空盘旋。\n6️⃣摇铃宠物\n地址：萧山区西湘里文创园\n价格：每人需要点一份饮品或甜品入场\n这是一个室内的狗狗社交场所，比较适合中小型犬，也适合下雨天。店内有精美的狗狗鲜食，还有可以2D打印的宠物图像拿铁，蛮有意思的。\n7️⃣独城生态公园\n免费的公园，有大草坪，小池塘，很多狗狗在这里聚会。',
      publishDate: '编辑于 01-30',
      title: '杭州遛狗圣地总结',
      tags: [],
      images: [
        'https://sns-webpic-qc.xhscdn.com/202503172214/8e425b40ce3a580b0ec6ef0ac6ba8cdc/1040g2sg31d9ebv6l0s705oo25b94hvlve435vk8!nd_dft_wgth_webp_3',
        'https://sns-webpic-qc.xhscdn.com/202503172214/d67c2ecd51941abfc0da9b835c439016/1040g008310mhe9cl6m005oo25b94hvlv7ce1ir8!nd_dft_wlteh_webp_3',
        'https://sns-webpic-qc.xhscdn.com/202503172214/95621ac6ae3f7e049bcd57d46e6c4454/1040g008310njqfhpmg005oo25b94hvlv25eihh8!nd_dft_wgth_webp_3',
        'https://sns-webpic-qc.xhscdn.com/202503172214/7ab2a9a61848fc244c0a8603ecaffd57/1040g008311k9at5q78305oo25b94hvlv6iiuh2g!nd_dft_wgth_webp_3',
        'https://sns-webpic-qc.xhscdn.com/202503172214/af97f593bb7265d6fc60f14ac1ef72a1/1040g008313k2les204005oo25b94hvlvc4sg0jg!nd_dft_wgth_webp_3',
        'https://sns-webpic-qc.xhscdn.com/202503172214/c394c7e5081a8e9e26daeaa4d93c954e/1040g2sg31c9bagvqgs705oo25b94hvlv5e9lgcg!nd_dft_wgth_webp_3',
        'https://sns-webpic-qc.xhscdn.com/202503172214/8e425b40ce3a580b0ec6ef0ac6ba8cdc/1040g2sg31d9ebv6l0s705oo25b94hvlve435vk8!nd_dft_wgth_webp_3',
        'https://sns-webpic-qc.xhscdn.com/202503172214/d67c2ecd51941abfc0da9b835c439016/1040g008310mhe9cl6m005oo25b94hvlv7ce1ir8!nd_dft_wlteh_webp_3',
      ],
      href: 'https://www.xiaohongshu.com/search_result/65fed28c0000000012034951?xsec_token=ABScfibb2QjXfkBAj0Q5mEN_hIMuQmfqBCroeS0m-1yWc=&xsec_source=',
    });
  }
}

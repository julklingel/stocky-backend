import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';

const ISIN = 'US5949181045';
const URL = `https://www.onvista.de/aktien/US5949181045`;

@Injectable()
export class ScrapperService {
  constructor() {}

  async scrapIndex( ) {
    try {
      const response = await axios.get(URL);
      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        const companyName = $(
          'h1.headline.headline--h1.headline--full-width.headline--no-margin.text-weight--medium.outer-spacing--small-right-md.ov-headline--h3-sm.ov-word-wrap.ov-text-overflow--ellipsis-md.ov-text-overflow--ellipsis-lg.ov-text-overflow--ellipsis-xl',
        ).text();
        const exchange = $(
          'span.button.button--xsmall.button--icon.inner-spacing--none-left.inner-spacing--none-right.text-weight--bold.color--cd-berry',
        ).text();
        const sharePrice = $('data.text-nowrap').text();
        const fundamentalDataEl =
          'outer-spacing--xsmall-top.outer-spacing--xsmall-bottom.flex-layout__basis--small--40.flex-layout__basis--medium--30';

        const extractDataByIndex = (index: number) => {
          return $(`div.${fundamentalDataEl}`).eq(index).find('data').text();
        };

        const marktkapitalisierung_value = extractDataByIndex(0);
        const dividendenrendite_value = extractDataByIndex(1);
        const kgv_value = extractDataByIndex(2);
        const gewinn_pro_aktie_value = extractDataByIndex(3);
        const vola_30_tage_value = extractDataByIndex(4);

        const data = {
          companyName,
          exchange,
          sharePrice,
          marktkapitalisierung_value,
          dividendenrendite_value,
          kgv_value,
          gewinn_pro_aktie_value,
          vola_30_tage_value,
        };

        console.log(data);
        return {
          'Data': data,
        };
      } else {
        throw new HttpException(
          `Failed to retrieve the page. Status code: ${response.status}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.error('Error fetching the page:', error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

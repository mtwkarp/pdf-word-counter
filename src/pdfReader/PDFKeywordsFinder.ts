// @ts-ignore
import { PdfReader } from 'pdfreader';
import request from 'request';
export default class PDFKeywordsFinder {
  constructor() {}

  async read(fileLink: string, keywords: string[]): Promise<string> {
    return new Promise(async(resolve) => {
      const foundedWords: Record<string, { number: number }> = {};

      let result = '';

      request({ url: fileLink, encoding: null }, function(error, response, body) {
        new PdfReader().parseBuffer(body, (err: any, item: { text: string }) => {
          if (err) console.error('error:', err);
          else if (!item) {
            let foundWord = false;

            result += '\nВ даному документі знайдені наступні діючі речовини: ';

            for (const key in foundedWords) {
              result += `\nРечовина ${key} згадується ${foundedWords[key].number} раз.`;
              foundWord = true;
            }

            if (!foundWord) result = 'Я не знайшов жодного препарату в даному документі. Сорямба (або ні).';

            resolve(result);
          } else if (item.text) {
            const textLowerCase = item.text.toLowerCase();
            for (let i = 0; i < keywords.length; i++) {
              const word = keywords[i].toLowerCase();

              if (textLowerCase.includes(word)) {
                if (foundedWords[word]) {
                  foundedWords[word].number += 1;
                } else {
                  foundedWords[word] = { number: 1 };
                }
              }
            }
          }
        });
      });
    });
  }
}

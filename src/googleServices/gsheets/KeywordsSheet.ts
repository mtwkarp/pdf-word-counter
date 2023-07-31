import SheetsService from '../services/SheetsService';

export default class KeywordsSheet extends SheetsService {
  constructor() {
    super(process.env.KEYWORDS_SPREADSHEET_ID as string);
  }

  public async getKeywords(): Promise<string[]> {
    const result = await this.getSheetValues({ range: 'A:A' });

    return result.flat();
  }
}

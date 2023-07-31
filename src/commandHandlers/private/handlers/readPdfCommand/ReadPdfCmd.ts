import PrivateCmdHandler from '../../PrivateCmdHandler';
import { CMD_NAMES } from '../../../../types/enums';
import { IPrivateContextDecorator } from '../../../../tglib/tgTypes/contextDecoratorTypes';
import { IPrivateDocumentPayload } from '../../../../tglib/tgTypes/messagePayload/contextPayloadTypes';
import KeywordsSheet from '../../../../googleServices/gsheets/KeywordsSheet';
import PDFKeywordsFinder from '../../../../pdfReader/PDFKeywordsFinder';

export default class ReadPdfCmd extends PrivateCmdHandler {
  private readonly keywordsSheet: KeywordsSheet;
  private readonly pdfKeywordsFinder: PDFKeywordsFinder;
  constructor(userId: number) {
    super(userId, CMD_NAMES.READPDF);

    this.keywordsSheet = new KeywordsSheet();
    this.pdfKeywordsFinder = new PDFKeywordsFinder();
  }

  copy(): PrivateCmdHandler {
    return new ReadPdfCmd(this.id);
  }

  protected override async onCommand(contextDecorator: IPrivateContextDecorator) {
    this.sendMessage('Надішли мені pdf файл і я перевірю його на наявність ключових слів.');
  }

  protected override async onDocument(contextDecorator: IPrivateContextDecorator) {
    await this.sendMessage('Наберись терпіння, це може зайняти трохи часу...');

    const payload = contextDecorator.payload as IPrivateDocumentPayload;
    const { file_id } = payload.document;
    const fileLink = await this.tg.getFileLink(file_id);
    const keywords = await this.keywordsSheet.getKeywords();

    const words = await this.pdfKeywordsFinder.read(fileLink.href, keywords);

    await this.sendMessage(words);
  }

  // private
}

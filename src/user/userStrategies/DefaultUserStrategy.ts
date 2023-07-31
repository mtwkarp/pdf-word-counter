import UserStrategy from './UserStrategy';
import { type IPrivateContextDecorator } from '../../tglib/tgTypes/contextDecoratorTypes';
import PrivateCmdHandlersManager from '../../commandHandlers/private/PrivateCmdHandlersManager';
import ReadPdfCmd from '../../commandHandlers/private/handlers/readPdfCommand/ReadPdfCmd';

class DefaultUserStrategy extends UserStrategy {
  protected cmdHandlerManager: PrivateCmdHandlersManager;
  constructor(userId: number) {
    super();

    this.cmdHandlerManager = new PrivateCmdHandlersManager(userId, [ReadPdfCmd]);
  }

  override onUpdate(context: IPrivateContextDecorator) {
    this.cmdHandlerManager.onUpdate(context);
  }
}

export default DefaultUserStrategy;

import EnvLoader from './envLoader/EnvLoader';
import TelegrafBot from './TelegrafBot';
import PrivateScopeManager from './user/PrivateScopeManager';
import PrivateUpdateSubject from './tglib/botUpdatesObservers/PrivateUpdateSubject';
import { type PRIVATE_UPDATE_TYPES } from './tglib/tgTypes/botUpdatesTypes';
import GoogleServicesManager from './googleServices/GoogleServicesManager';
import ServerExpress from './expressServer/ServerExpress';
export default class MyBot {
  public bot: TelegrafBot;
  private privateUpdateSubject: PrivateUpdateSubject;
  private userScopeManager: PrivateScopeManager;
  private readonly privateMessagesTypes: PRIVATE_UPDATE_TYPES[];
  private readonly privateCommands: string[];
  constructor(privateMessagesTypes: PRIVATE_UPDATE_TYPES[], privateCommands: string[]) {
    this.privateMessagesTypes = privateMessagesTypes;
    this.privateCommands = privateCommands;
  }

  public async init(): Promise<void> {
    this.initEnvironmentVariables();
    new ServerExpress();
    await this.initGoogleServices();
    await this.initBot();
    this.initPrivateUpdateSubject();
    this.initUserScopeManager();
    this.subscribeForPrivateMessagesUpdates();
  }

  private async initGoogleServices(): Promise<void> {
    const googleServicesManager = new GoogleServicesManager();

    await googleServicesManager.authorize();
  }

  private async initBot(): Promise<void> {
    this.bot = new TelegrafBot();
    await this.bot.initBot();
    await this.bot.launchBot();
  }

  private initEnvironmentVariables(): void {
    EnvLoader.load();
  }

  private initUserScopeManager() {
    this.userScopeManager = new PrivateScopeManager();
  }

  private initPrivateUpdateSubject() {
    this.privateUpdateSubject = new PrivateUpdateSubject(this.privateMessagesTypes, this.privateCommands);
    this.privateUpdateSubject.subscribeForBotUpdates(this.bot);
  }

  private subscribeForPrivateMessagesUpdates() {
    this.privateUpdateSubject.registerObserver(this.userScopeManager);
  }
}

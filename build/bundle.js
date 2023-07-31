(()=>{"use strict";var e={155:function(e,t,o){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(o(349)),a=s(o(620)),i=s(o(946)),r=s(o(164)),d=s(o(62));t.default=class{constructor(e,t){this.privateMessagesTypes=e,this.privateCommands=t}async init(){this.initEnvironmentVariables(),await this.initGoogleServices(),await this.initBot(),this.initPrivateUpdateSubject(),this.initUserScopeManager(),this.subscribeForPrivateMessagesUpdates()}async initGoogleServices(){const e=new d.default;await e.authorize()}async initBot(){this.bot=new a.default,await this.bot.initBot(),await this.bot.launchBot()}initEnvironmentVariables(){n.default.load()}initUserScopeManager(){this.userScopeManager=new i.default}initPrivateUpdateSubject(){this.privateUpdateSubject=new r.default(this.privateMessagesTypes,this.privateCommands),this.privateUpdateSubject.subscribeForBotUpdates(this.bot)}subscribeForPrivateMessagesUpdates(){this.privateUpdateSubject.registerObserver(this.userScopeManager)}}},620:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=o(832),n=o(750);class a extends s.Telegraf{constructor(){super(process.env.TELEGRAM_BOT_TOKEN)}async initBot(){await this.initCommands()}async launchBot(){this.launch()}async initCommands(){const e=[];for(const t in n.commandsDescription)e.push(n.commandsDescription[t]);await this.telegram.setMyCommands(e).then((()=>{console.log("COMMANDS are set successfully")})).catch((e=>{console.error(e)}))}}t.default=a},540:function(e,t,o){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=o(832),a=o(604),i=s(o(820));class r extends i.default{constructor(e,t){super(),this.id=e,this.tg=new n.Telegram(process.env.TELEGRAM_BOT_TOKEN),this._name=t,this.updateTypesImplementations={[a.PRIVATE_UPDATE_TYPES.text]:this.onText.bind(this),[a.PRIVATE_UPDATE_TYPES.callback_query]:this.onCallbackQuery.bind(this),[a.PRIVATE_UPDATE_TYPES.animation]:this.onAnimation.bind(this),[a.PRIVATE_UPDATE_TYPES.audio]:this.onAudio.bind(this),[a.PRIVATE_UPDATE_TYPES.document]:this.onDocument.bind(this),[a.PRIVATE_UPDATE_TYPES.photo]:this.onPhoto.bind(this),[a.PRIVATE_UPDATE_TYPES.sticker]:this.onSticker.bind(this),[a.PRIVATE_UPDATE_TYPES.video]:this.onVideo.bind(this),[a.PRIVATE_UPDATE_TYPES.video_note]:this.onVideoNote.bind(this),[a.PRIVATE_UPDATE_TYPES.voice]:this.onVoice.bind(this),[a.PRIVATE_UPDATE_TYPES.edited_message]:this.onEditedMessage.bind(this),[a.PRIVATE_UPDATE_TYPES.command]:this.onCommand.bind(this)}}get name(){return this._name}async sendMessage(e){await this.tg.sendMessage(this.id.toString(),e)}finishCmd(){}notifyAboutCmdFinish(){this.finishCmd()}onUpdate(e){void 0!==this.updateTypesImplementations[e.updateType]?this.updateTypesImplementations[e.updateType](e):this.updateNotSupported(e.updateType)}updateNotSupported(e){console.log(`Update ${e} not supported`)}onCommand(e){this.noImplementationFound(e)}onCallbackQuery(e){this.noImplementationFound(e)}noImplementationFound(e){console.log(`Update type is ${e.updateType}, but no implementation in current handler (handler name - ${this.name}) found.`)}onText(e){this.noImplementationFound(e)}onAnimation(e){this.noImplementationFound(e)}onAudio(e){this.noImplementationFound(e)}onDocument(e){this.noImplementationFound(e)}onPhoto(e){this.noImplementationFound(e)}onSticker(e){this.noImplementationFound(e)}onVideo(e){this.noImplementationFound(e)}onVideoNote(e){this.noImplementationFound(e)}onVoice(e){this.noImplementationFound(e)}onEditedMessage(e){this.noImplementationFound(e)}}t.default=r},638:function(e,t,o){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(o(502)),a=o(604),i=s(o(430));class r extends n.default{constructor(e,t){super(),this.id=e,this.handlers={},this.defaultHandler=new i.default(this.id),this.setDefaultHandler(),this.initHandlers(t)}initHandlers(e){e.forEach((e=>{const t=new e(this.id);this.handlers[t.name]=t}))}setCurrentHandler(e,t){this.currentHandler=this.handlers[e].copy(),this.currentHandler.onUpdate(t)}setDefaultHandler(){this.currentHandler=this.defaultHandler}onUpdate(e){e.updateType!==a.PRIVATE_UPDATE_TYPES.command?this.currentHandler.onUpdate(e):this.onCommand(e)}onCommand(e){const t=e.payload;void 0!==this.findHandlerByName(t.command)?this.setCurrentHandler(t.command,e):this.noCommandHandlerAvailable()}noCommandHandlerAvailable(){this.currentHandler.finishCmd(),this.setDefaultHandler()}findHandlerByName(e){return this.handlers[e]}}t.default=r},430:function(e,t,o){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(o(540)),a=o(785);class i extends n.default{constructor(e){super(e,a.CMD_NAMES.NONE)}copy(){return new i(this.id)}sendNotAvailableCmdMessage(){this.sendMessage("Дана команда наразі вам недоступна. Зверніться до адміністратора бота.")}}t.default=i},764:function(e,t,o){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(o(540)),a=o(785),i=s(o(414)),r=s(o(432));class d extends n.default{constructor(e){super(e,a.CMD_NAMES.READPDF),this.keywordsSheet=new i.default,this.pdfKeywordsFinder=new r.default}copy(){return new d(this.id)}async onCommand(e){this.sendMessage("Надішли мені pdf файл і я перевірю його на наявність ключових слів.")}async onDocument(e){await this.sendMessage("Наберись терпіння, це може зайняти трохи часу...");const t=e.payload,{file_id:o}=t.document,s=await this.tg.getFileLink(o),n=await this.keywordsSheet.getKeywords(),a=await this.pdfKeywordsFinder.read(s.href,n);await this.sendMessage(a)}}t.default=d},349:function(e,t,o){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(o(142));t.default=class{static load(){n.default.config();const{mode:e}=process.env;"development"!==e&&"test"!==e||this.loadDevEnvVariables(),"production"===e&&this.loadProdEnvVariables()}static loadDevEnvVariables(){process.env.TELEGRAM_BOT_TOKEN=process.env.TELEGRAM_BOT_TOKEN_DEVELOPMENT,process.env.TELEGRAM_CHANNEL_ID=process.env.TELEGRAM_CHANNEL_ID_DEVELOPMENT,process.env.KEYWORDS_SPREADSHEET_ID=process.env.KEYWORDS_SPREADSHEET_ID_DEVELOPMENT}static loadProdEnvVariables(){process.env.TELEGRAM_BOT_TOKEN=process.env.TELEGRAM_BOT_TOKEN_PRODUCTION,process.env.TELEGRAM_CHANNEL_ID=process.env.TELEGRAM_CHANNEL_ID_PRODUCTION,process.env.KEYWORDS_SPREADSHEET_ID=process.env.KEYWORDS_SPREADSHEET_ID_PRODUCTION}}},62:function(e,t,o){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=o(781),a=s(o(971));class i{constructor(){if(null!==i.instance)return i.instance;i.instance=this}async authorize(){i.authObj||(i.authObj=await new n.GoogleAuth({credentials:a.default.serviceAccountCredentials,scopes:["https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/drive"]}))}static get authenticationObject(){return i.authObj}}t.default=i,i.instance=null},414:function(e,t,o){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(o(326));class a extends n.default{constructor(){super(process.env.KEYWORDS_SPREADSHEET_ID)}async getKeywords(){return(await this.getSheetValues({range:"A:A"})).flat()}}t.default=a},326:function(e,t,o){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=o(993),a=s(o(62));t.default=class{constructor(e){this.spreadsheetId=e,this.spreadsheet=n.google.sheets({version:"v4",auth:a.default.authenticationObject}),this.values=this.spreadsheet.spreadsheets.values}async getSheetValues({range:e}){const t=(await this.values.get({spreadsheetId:this.spreadsheetId,range:e})).data.values;return null==t?(console.log("No value found in sheets"),[[]]):t}async updateSheetValues(e){const t=e.valueInputOption||"USER_ENTERED",o=e.majorDimension||"COLUMNS";return await this.values.update({spreadsheetId:this.spreadsheetId,range:e.range,valueInputOption:t,requestBody:{range:e.range,majorDimension:o,values:e.values}})}}},971:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{static get serviceAccountCredentials(){const e=process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replaceAll("\\n","\n");return{type:process.env.SERVICE_ACCOUNT_TYPE,project_id:process.env.SERVICE_ACCOUNT_PROJECT_ID,private_key_id:process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID,private_key:e,client_email:process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,client_id:process.env.SERVICE_ACCOUNT_CLIENT_ID,auth_uri:process.env.SERVICE_ACCOUNT_AUTH_URI,token_uri:process.env.SERVICE_ACCOUNT_TOKEN_URI,auth_provider_x509_cert_url:process.env.SERVICE_ACCOUNT_AUTH_PROVIDER_CERT_URL,client_x509_cert_url:process.env.SERVICE_ACCOUNT_CLIENT_CERT_URL}}}},341:function(e,t,o){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(o(155)),a=o(604),i=o(785),{text:r,callback_query:d,command:c,animation:u,audio:l,document:_,photo:p,sticker:h,video:m,video_note:E,voice:f,edited_message:P,location:T}=a.PRIVATE_UPDATE_TYPES,v=[r,d,c,u,l,_,p,h,m,E,f,P,T],A=[i.CMD_NAMES.READPDF];new n.default(v,A).init().then((()=>{console.log("Successful APPLICATION start")})).catch((e=>{console.log(e)}))},432:function(e,t,o){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=o(623),a=s(o(910));t.default=class{constructor(){}async read(e,t){return new Promise((async o=>{const s={};let i="";(0,a.default)({url:e,encoding:null},(function(e,a,r){(new n.PdfReader).parseBuffer(r,((e,n)=>{if(e)console.error("error:",e);else if(n){if(n.text){const e=n.text.toLowerCase();for(let o=0;o<t.length;o++){const n=t[o].toLowerCase();e.includes(n)&&(s[n]?s[n].number+=1:s[n]={number:1})}}}else{let e=!1;i+="\nВ даному документі знайдені наступні діючі речовини: ";for(const t in s)i+=`\nРечовина ${t} згадується ${s[t].number} раз.`,e=!0;e||(i="Я не знайшов жодного препарату в даному документі. Сорямба (або ні)."),o(i)}}))}))}))}}},750:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.commandsDescription=void 0;const s={readpdf:{command:o(785).CMD_NAMES.READPDF,description:"Прочитати PDF та надати ключові слова."}};t.commandsDescription=s},164:function(e,t,o){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=o(604),a=s(o(438)),i=s(o(295));class r extends a.default{constructor(e,t){super(e),this.receiveCommands=t,this.contextDecoratorCreator=new i.default}subscribeForBotUpdates(e){this.subscribeForCommands(e),this.subscribeForMessages(e)}subscribeForCommands(e){this.receiveCommands.forEach((t=>{e.command(t,(e=>{this.onUpdate(n.PRIVATE_UPDATE_TYPES.command,e)}))}))}onUpdate(e,t){if("private"!==t.chat?.type)return;const o=this.contextDecoratorCreator.createDecorator(e,t);null!==o&&this.notifyObservers(o)}}t.default=r},438:function(e,t,o){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(o(998));class a extends n.default{constructor(e){super(),this.receiveMessagesTypes=e}subscribeForBotUpdates(e){this.subscribeForMessages(e)}subscribeForMessages(e){this.receiveMessagesTypes.forEach((t=>{"command"!==t&&e.on(t,(e=>{this.onUpdate(t,e)}))}))}}t.default=a},959:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{}},295:function(e,t,o){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(o(959)),a=o(317),i=s(o(873));class r extends n.default{constructor(){super(...arguments),this.updateScope=a.UPDATE_SCOPES.PRIVATE,this.payloadCreator=new i.default}createDecorator(e,t){const o=this.payloadCreator.create(e,t);return null===o?null:{payload:o,messagePayloadType:o.type,updateType:e,updateScope:this.updateScope,context:t}}}t.default=r},838:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=o(604);t.default=class{static getMessageField(e){return e.update.message}static getUpdateMessageType(e){for(const t in s.MESSAGES_TYPES)if(Object.prototype.hasOwnProperty.call(e,t))return t;return s.MESSAGES_TYPES.none}static getContextUpdateType(e){for(const t in s.UPDATE_TYPES)if(Object.prototype.hasOwnProperty.call(e,t))return t;return s.UPDATE_TYPES.unknown}}},998:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this.observers=[]}registerObserver(e){this.observers.includes(e)?console.warn("This observer already registered"):this.observers.push(e)}removeObserver(e){this.observers.includes(e)?this.observers.splice(this.observers.indexOf(e),1):console.warn("No such observer you are trying to delete")}notifyObservers(e){this.observers.forEach((t=>{t.onUpdate(e)}))}}},873:function(e,t,o){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=o(604),a=o(496),i=s(o(838)),r=s(o(820));class d extends r.default{constructor(){super(...arguments),this.decoratorCreatorFunctionByUpdateType={[n.PRIVATE_UPDATE_TYPES.text]:this.onText.bind(this),[n.PRIVATE_UPDATE_TYPES.callback_query]:this.onCallbackQuery.bind(this),[n.PRIVATE_UPDATE_TYPES.command]:this.onCommand.bind(this),[n.PRIVATE_UPDATE_TYPES.animation]:this.onAnimation.bind(this),[n.PRIVATE_UPDATE_TYPES.audio]:this.onAudio.bind(this),[n.PRIVATE_UPDATE_TYPES.document]:this.onDocument.bind(this),[n.PRIVATE_UPDATE_TYPES.photo]:this.onPhoto.bind(this),[n.PRIVATE_UPDATE_TYPES.sticker]:this.onSticker.bind(this),[n.PRIVATE_UPDATE_TYPES.video]:this.onVideo.bind(this),[n.PRIVATE_UPDATE_TYPES.video_note]:this.onVideoNote.bind(this),[n.PRIVATE_UPDATE_TYPES.voice]:this.onVoice.bind(this),[n.PRIVATE_UPDATE_TYPES.edited_message]:this.onEditedMessage.bind(this),[n.PRIVATE_UPDATE_TYPES.location]:this.onLocation.bind(this)}}create(e,t){const o=this.decoratorCreatorFunctionByUpdateType[e];return void 0===o?(console.log(`Creation of this kind of payload (${e}) not yet supported`),null):o(t)||null}getDefaultMediaValuesFromMsg(e){return{caption:e.caption,caption_entities:e.caption_entities,media_group_id:e.media_group_id}}getDefaultPayload(e,t,o){const s=i.default.getContextUpdateType(e.update);let a=n.MESSAGES_TYPES.none;if(s===n.UPDATE_TYPES.unknown)throw new Error("UPDATE TYPE UNKNOWN !!!");return s===n.UPDATE_TYPES.message&&(a=i.default.getUpdateMessageType(e.message)),{senderId:o.id,chatId:o.id,updateType:s,messageType:a,type:t}}onText(e){const t=i.default.getMessageField(e);return{...this.getDefaultPayload(e,a.PAYLOAD_TYPES.text,t.from),text:t.text,entities:t.entities}}onCallbackQuery(e){const t=e.update,o=this.getDefaultPayload(e,a.PAYLOAD_TYPES.callback_query,t.callback_query.from),s=t.callback_query.message;return{...o,callback_query:t.callback_query,messageId:s.message_id}}onCommand(e){const t=i.default.getMessageField(e);return{...this.getDefaultPayload(e,a.PAYLOAD_TYPES.command,t.from),command:t.text.slice(1)}}onAnimation(e){const t=i.default.getMessageField(e);return{...this.getDefaultPayload(e,a.PAYLOAD_TYPES.animation,t.from),animation:t.animation,document:t.document}}onAudio(e){const t=i.default.getMessageField(e);return{...this.getDefaultPayload(e,a.PAYLOAD_TYPES.audio,t.from),audio:t.audio,...this.getDefaultMediaValuesFromMsg(t)}}onDocument(e){const t=i.default.getMessageField(e);return{...this.getDefaultPayload(e,a.PAYLOAD_TYPES.document,t.from),document:t.document,...this.getDefaultMediaValuesFromMsg(t)}}onPhoto(e){const t=i.default.getMessageField(e);return{...this.getDefaultPayload(e,a.PAYLOAD_TYPES.photo,t.from),photo:t.photo,...this.getDefaultMediaValuesFromMsg(t)}}onSticker(e){const t=i.default.getMessageField(e);return{...this.getDefaultPayload(e,a.PAYLOAD_TYPES.sticker,t.from),sticker:t.sticker}}onVideo(e){const t=i.default.getMessageField(e);return{...this.getDefaultPayload(e,a.PAYLOAD_TYPES.video,t.from),video:t.video,...this.getDefaultMediaValuesFromMsg(t)}}onVideoNote(e){const t=i.default.getMessageField(e);return{...this.getDefaultPayload(e,a.PAYLOAD_TYPES.video_note,t.from),video_note:t.video_note}}onVoice(e){const t=i.default.getMessageField(e);return{...this.getDefaultPayload(e,a.PAYLOAD_TYPES.voice,t.from),voice:t.voice,caption:t.caption}}onEditedMessage(e){const t=e.update;return{...this.getDefaultPayload(e,a.PAYLOAD_TYPES.edited_message,t.edited_message.from),edited_message:t,edited_message_type:i.default.getUpdateMessageType(t.edited_message)}}onLocation(e){const t=i.default.getMessageField(e);return{...this.getDefaultPayload(e,a.PAYLOAD_TYPES.voice,t.from),location:t.location}}}t.default=d},820:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{onText(e){}onCallbackQuery(e){}onCommand(e){}onAnimation(e){}onAudio(e){}onDocument(e){}onPhoto(e){}onSticker(e){}onVideo(e){}onVideoNote(e){}onVoice(e){}onEditedMessage(e){}onLocation(e){}}},317:(e,t)=>{var o;Object.defineProperty(t,"__esModule",{value:!0}),t.UPDATE_SCOPES=void 0,function(e){e.CHANNEL="channel_scope",e.CHAT="chat_scope",e.PRIVATE="private_scope"}(o||(o={})),t.UPDATE_SCOPES=o},604:(e,t)=>{var o,s,n,a,i;Object.defineProperty(t,"__esModule",{value:!0}),t.UPDATE_TYPES=t.MESSAGES_TYPES=t.CHAT_UPDATE_TYPES=t.CHANNEL_UPDATE_TYPES=t.PRIVATE_UPDATE_TYPES=void 0,function(e){e.text="text",e.audio="audio",e.document="document",e.animation="animation",e.photo="photo",e.sticker="sticker",e.video="video",e.video_note="video_note",e.voice="voice",e.contact="contact",e.dice="dice",e.game="game",e.poll="poll",e.location="location",e.venue="venue",e.new_chat_members="new_chat_members",e.left_chat_member="left_chat_member",e.new_chat_title="new_chat_title",e.new_chat_photo="new_chat_photo",e.delete_chat_photo="delete_chat_photo",e.group_chat_created="group_chat_created",e.supergroup_chat_created="supergroup_chat_created",e.channel_chat_created="channel_chat_created",e.message_auto_delete_timer_changed="message_auto_delete_timer_changed",e.migrate_to_chat_id="migrate_to_chat_id",e.migrate_from_chat_id="migrate_from_chat_id",e.pinned_message="pinned_message",e.invoice="invoice",e.successful_payment="successful_payment",e.connected_website="connected_website",e.passport_data="passport_data",e.proximity_alert_triggered="proximity_alert_triggered",e.forum_topic_created="forum_topic_created",e.forum_topic_closed="forum_topic_closed",e.forum_topic_reopened="forum_topic_reopened",e.video_chat_scheduled="video_chat_scheduled",e.video_chat_started="video_chat_started",e.video_chat_ended="video_chat_ended",e.video_chat_participants_invited="video_chat_participants_invited",e.web_app_data="web_app_data",e.none="none"}(o||(o={})),t.MESSAGES_TYPES=o,function(e){e.message="message",e.edited_message="edited_message",e.channel_post="channel_post",e.edited_channel_post="edited_channel_post",e.inline_query="inline_query",e.chosen_inline_result="chosen_inline_result",e.callback_query="callback_query",e.shipping_query="shipping_query",e.pre_checkout_query="pre_checkout_query",e.poll="poll",e.poll_answer="poll_answer",e.my_chat_member="my_chat_member",e.chat_member="chat_member",e.chat_join_request="chat_join_request",e.unknown="unknown"}(s||(s={})),t.UPDATE_TYPES=s,function(e){e.text="text",e.callback_query="callback_query",e.command="command",e.animation="animation",e.audio="audio",e.document="document",e.photo="photo",e.sticker="sticker",e.video="video",e.video_note="video_note",e.voice="voice",e.edited_message="edited_message",e.location="location"}(n||(n={})),t.PRIVATE_UPDATE_TYPES=n,function(e){e.channel_post="channel_post"}(a||(a={})),t.CHANNEL_UPDATE_TYPES=a,function(e){e.new_chat_photo="new_chat_photo",e.command="command"}(i||(i={})),t.CHAT_UPDATE_TYPES=i},496:(e,t)=>{var o;Object.defineProperty(t,"__esModule",{value:!0}),t.PAYLOAD_TYPES=void 0,(o=t.PAYLOAD_TYPES||(t.PAYLOAD_TYPES={})).audio="audio_payload_type",o.text="text_payload_type",o.callback_query="callback_query_payload_type",o.command="command_type",o.animation="animation_type",o.document="document_type",o.photo="photo_type",o.sticker="sticker_type",o.video="video_type",o.video_note="video_note_type",o.voice="voice_type",o.edited_message="edited_message_type"},785:(e,t)=>{var o;Object.defineProperty(t,"__esModule",{value:!0}),t.CMD_NAMES=void 0,(o=t.CMD_NAMES||(t.CMD_NAMES={})).READPDF="readpdf",o.NONE="none"},946:function(e,t,o){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(o(358));t.default=class{constructor(){this.users={}}getUserById(e){let t=this.users[e];return void 0===t&&(t=this.createUserScope(e)),t}createUserScope(e){const t=new n.default(e);return this.users[e]=t,t}onUpdate(e){this.getUserById(e.payload.senderId).onUpdate(e)}}},358:function(e,t,o){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(o(80));t.default=class{constructor(e){this.id=e,this.strategy=new n.default(e)}onUpdate(e){this.strategy.onUpdate(e)}}},80:function(e,t,o){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(o(481)),a=s(o(638)),i=s(o(764));class r extends n.default{constructor(e){super(),this.cmdHandlerManager=new a.default(e,[i.default])}onUpdate(e){this.cmdHandlerManager.onUpdate(e)}}t.default=r},481:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{}},142:e=>{e.exports=require("dotenv")},502:e=>{e.exports=require("eventemitter3")},781:e=>{e.exports=require("google-auth-library")},993:e=>{e.exports=require("googleapis")},623:e=>{e.exports=require("pdfreader")},910:e=>{e.exports=require("request")},832:e=>{e.exports=require("telegraf")}},t={};!function o(s){var n=t[s];if(void 0!==n)return n.exports;var a=t[s]={exports:{}};return e[s].call(a.exports,a,a.exports,o),a.exports}(341)})();
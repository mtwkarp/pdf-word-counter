import { type CommandsDictionary } from '../types/types';
import { CMD_NAMES } from '../types/enums';

const commandsDescription: Readonly<CommandsDictionary> = {
  readpdf: { command: CMD_NAMES.READPDF, description: 'Прочитати PDF та надати ключові слова.' }
};

export { commandsDescription };

import { Command, flags } from '@oclif/command';
import * as ipoService from '../../services/ipo.service';
import * as UsersService from '../../services/users.service';

enum BaseFlags {
  HELP = 'help',
  SYMBOL = 'symbol',
  OPEN = 'open',
  CLOSE = 'close',
  HIGH = 'high',
  LOW = 'low',
  VOLUME = 'volume',
  DATE = 'date'
};

const ipoFlags = {
  ...BaseFlags
};
type ipoFlags = BaseFlags;

export default class Ipo extends Command {
  static description = 'add a new stock and its ipo data to the database'

  static flags = {
    [ipoFlags.HELP]: flags.help({ char: 'h' }),
    [ipoFlags.SYMBOL]: flags.string({
      char: 's',
      description: 'name/ticker/symbol of stock',
      required: true
    }),
    [ipoFlags.HIGH]: flags.string({
      char: 'u',
      description: `highest value of the stock on the first day.`,
      required: true
    }),
    [ipoFlags.LOW]: flags.string({
      char: 'l',
      description: `lowest value of the stock on the first day.`,
      required: true
    }),
    [ipoFlags.CLOSE]: flags.string({
      char: 'c',
      description: `closing value of the stock on the first day.`,
      required: true
    }),
    [ipoFlags.OPEN]: flags.string({
      char: 'o',
      description: `opening value of the stock on the first day.`,
      required: true
    }),
    [ipoFlags.VOLUME]: flags.string({
      char: 'v',
      description: `volume of the stock on the first day.`,
      required: true
    }),
    [ipoFlags.DATE]: flags.string({
      char: 'd',
      description: `ipo date of the stock. must be of format yyyy-mm-dd`,
      required: true
    })
  }

  async run() {
    const { args, flags } = this.parse(Ipo)

    if (!await UsersService.checkUserLoggedIn()) {
      this.error('please login using user command first', { suggestions: ['user -h'] });
    }

    if (!await UsersService.getCurrentUserPriv()) {
      this.error('Current user does not have write permissions on database');
    }

    await ipoService.createNewStock(flags[ipoFlags.SYMBOL], flags[ipoFlags.HIGH], flags[ipoFlags.LOW], flags[ipoFlags.OPEN], flags[ipoFlags.CLOSE], flags[ipoFlags.VOLUME], flags[ipoFlags.DATE]);

  }
}

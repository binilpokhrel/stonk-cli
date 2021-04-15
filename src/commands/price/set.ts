import { Command, flags } from '@oclif/command';
import * as TradeService from '../../services/trades.service';
import * as UsersService from '../../services/users.service';

enum BaseFlags {
  HELP = 'help',
  SYMBOL = 'symbol',
  DATE = 'date',
  VOLUME = 'volume',
  OPEN = 'open',
  HIGH = 'high',
  LOW = 'low',
  CLOSE = 'close',
  ADJCLOSE = 'adj_close'
}

const PriceFlags = {
  ...BaseFlags
};
type PriceFlags = BaseFlags;

export default class Price extends Command {
  static description = 'set the daily values of a single stock';

  static flags = {
    [PriceFlags.HELP]: flags.help({ char: 'h' }),
    [PriceFlags.SYMBOL]: flags.string({
      char: 's',
      description: 'name/ticker/symbol of stock',
      required: true
    }),
    [PriceFlags.DATE]: flags.string({
      char: 'd',
      description: `full date of interest in yyyy-mm-dd format.`,
      required: true
    }),
    [PriceFlags.VOLUME]: flags.string({
      char: 'v',
      description: `volume of stocks on the day.`,
      required: true
    }),
    [PriceFlags.OPEN]: flags.string({
      char: 'o',
      description: `opening value of the stock on the day.`,
      required: true
    }),
    [PriceFlags.HIGH]: flags.string({
      char: 'u',
      description: `highest value of the stock on the day.`,
      required: true
    }),
    [PriceFlags.LOW]: flags.string({
      char: 'l',
      description: `lowest value of the stock on the day.`,
      required: true
    }),
    [PriceFlags.CLOSE]: flags.string({
      char: 'c',
      description: `closing value of the stock on the day.`,
      required: true
    }),
    [PriceFlags.ADJCLOSE]: flags.string({
      char: 'a',
      description: `adjusted cloding value of the stock on the day.`,
      required: true
    }),
  };

  async run() {
    const { args, flags } = this.parse(Price);

    if(!await UsersService.checkUserLoggedIn()) {
      this.error("please login using user command first");
    }

    if((await UsersService.getCurrentUserPriv()) != "1") {
      this.error('Current user does not have write permissions on database');
    }

    await TradeService.addNewTickerHistoryEntry(flags[PriceFlags.SYMBOL],flags[PriceFlags.DATE],flags[PriceFlags.VOLUME],flags[PriceFlags.OPEN],flags[PriceFlags.CLOSE],flags[PriceFlags.HIGH],flags[PriceFlags.LOW],flags[PriceFlags.ADJCLOSE]);
    
  }
}

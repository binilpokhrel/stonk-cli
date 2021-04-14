import { Command, flags } from '@oclif/command'
import { DateFlags, StaticDateFlags } from '../services/date.service'

enum BaseFlags {
  HELP = 'help',
  SYMBOL = 'symbol'
}

const PriceFlags = {
  ...DateFlags,
  ...BaseFlags
};
type PriceFlags = BaseFlags | DateFlags;

export default class Price extends Command {
  static description = 'get the price of one or more stocks, on a single date, single quarter, or range of either';

  static flags = {
    ...StaticDateFlags,
    [PriceFlags.HELP]: flags.help({ char: 'h' }),
    [PriceFlags.SYMBOL]: flags.string({
      char: 's',
      description: 'name/ticker/symbol of stock',
      multiple: true,
      required: true
    }),
  };

  async run() {
    const { args, flags } = this.parse(Price);

    this.log(`hello ${flags[PriceFlags.SYMBOL]} from /Users/binilpokhrel/Documents/Code/stonk-cli/src/commands/price.ts`);
  }
}

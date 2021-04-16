import { Command, flags } from '@oclif/command';
import * as ipoService from '../../services/ipo.service';
import { Stock } from "../../models/stocks.model";

enum BaseFlags {
  HELP = 'help',
  SYMBOL = 'symbol',
  TYPE = 'type'
};

const ipoFlags = {
  ...BaseFlags
};
type ipoFlags = BaseFlags;

export default class Ipo extends Command {
  static description = 'get ipo data related to a particular stock'

  static flags = {
    [ipoFlags.HELP]: flags.help({ char: 'h' }),
    [ipoFlags.SYMBOL]: flags.string({
      char: 's',
      description: 'name/ticker/symbol of stock',
      required: true
    }),
    [ipoFlags.TYPE]: flags.string({
      char: 't',
      description: 'the type of ipo data requested',
      default: 'ipo_date',
      options: ['ipo_date', 'high_day_0', 'open_day_0', 'low_day_0', 'volume_day_0', 'close_day_0']
    }),
  }

  async run() {
    const { args, flags } = this.parse(Ipo)

    const output = await ipoService.getIpoData(flags[ipoFlags.SYMBOL], flags[ipoFlags.TYPE] as keyof Stock);

    console.log(`${flags[ipoFlags.TYPE]} => ${output}`);

  }
}

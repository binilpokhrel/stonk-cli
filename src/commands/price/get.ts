import { Command, flags } from '@oclif/command'
import { TradeHistory } from '../../models/trades.model';
import { DateFlags, StaticDateFlags } from '../../services/date.service'
import * as TradeService from '../../services/trades.service'

enum BaseFlags {
  HELP = 'help',
  SYMBOL = 'symbol',
  TYPE = 'type',
  DELTA = 'delta'
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
      required: true
    }),
    [PriceFlags.TYPE]: flags.string({
      char: 't',
      description: 'which price of the day. options are: open, close, high, low, adjclose',
      default: 'open',
      options: ['open', 'close', 'high', 'low', 'adj_close'],
      required: true
    }),
    [PriceFlags.DELTA]: flags.boolean({
      char: 'w',
      description: 'use this flag to specify finding the absolute difference between the values at the ends of a range',
    })
  };

  async run() {
    const { args, flags } = this.parse(Price);

    // TODO: Add quarterly aggregation
    // TODO: fix this -> since delta functionality uses exact dates, if dates are missing right now it just returns 0
    // TODO: right now aggregation (delta or average) only happens if the user specifies a range, if this is fine then nothing todo, else change functionality

    if(flags[DateFlags.RANGE]) { // aggregation cases
      let date1;
      let date2;
      if (flags[DateFlags.FULLDATE]) {
        date1 = new Date(flags[DateFlags.FULLDATE]!);
        date2 = new Date(flags[DateFlags.FULLDATE]!);
        date2.setDate(date2.getDate() + flags[DateFlags.RANGE]! * (flags[DateFlags.YEARS] ? 365 : 1) * (flags[DateFlags.MONTHS] ? 30 : 1));
      } else if (flags[DateFlags.YEAR] && flags[DateFlags.MONTH] && flags[DateFlags.DAY]) {
        date1 = new Date(`${flags[DateFlags.YEAR]}-${flags[DateFlags.MONTH]}-${flags[DateFlags.DAY]}`);
        date2 = new Date(`${flags[DateFlags.YEAR]}-${flags[DateFlags.MONTH]}-${flags[DateFlags.DAY]}`);
        date2.setDate(date2.getDate() + flags[DateFlags.RANGE]! * (flags[DateFlags.YEARS] ? 365 : 1) * (flags[DateFlags.MONTHS] ? 30 : 1));
      } else {
        this.error("Invalid input: must specify an exact date and range for aggregation");
      }
      if(flags[BaseFlags.DELTA]) { // diff case
        const diff = await TradeService.getDelta(flags[BaseFlags.SYMBOL], flags[BaseFlags.TYPE] as keyof TradeHistory, date1, date2);
        date1.setDate(date1.getDate()+1);
        date2.setDate(date2.getDate()+1);
        this.log(`The difference between ${date2.toDateString()} and ${date1.toDateString()} is ${diff}`);
      } else { // average case
        const avg = await TradeService.getAverage(flags[BaseFlags.SYMBOL], flags[BaseFlags.TYPE] as keyof TradeHistory, date1, date2);
        date1.setDate(date1.getDate()+1);
        date2.setDate(date2.getDate()+1);
        this.log(`The average value within dates ${date2.toDateString()} and ${date1.toDateString()} is ${avg}`);
      }
    } else { // no aggregation cases
      if (flags[DateFlags.FULLDATE]) {
        const date = new Date(flags[DateFlags.FULLDATE]!);
        const price = await TradeService.getTickerPriceWithDates(flags[BaseFlags.SYMBOL], flags[BaseFlags.TYPE] as keyof TradeHistory, date.getFullYear().toString(), (date.getMonth()+1).toString(), (date.getDate()+1).toString());
        price.forEach(p => this.log(p.toString()));
      } else if (flags[DateFlags.YEAR] || flags[DateFlags.MONTH] || flags[DateFlags.DAY]) {
        const price = await TradeService.getTickerPriceWithDates(flags[BaseFlags.SYMBOL], flags[BaseFlags.TYPE] as keyof TradeHistory, flags[DateFlags.YEAR]?.toString(), flags[DateFlags.MONTH]?.toString(), flags[DateFlags.DAY]?.toString());
        price.forEach(p => this.log(p.toString()));
      }else {
        this.error("Invalid inputs. Specify a date, and optionally a range to get an aggregation")
      }
    }
  }
}

import { Command, flags } from '@oclif/command';
import { TradeHistory } from '../../models/trades.model';
import * as TradeService from '../../services/trades.service';

enum BaseFlags {
  HELP = 'help',
  SYMBOL = 'symbol',
  TYPE = 'type',
  DELTA = 'delta',
  FULLDATE = 'full-date',
  YEAR = 'year',
  MONTH = 'month',
  DAY = 'day',
  RANGE = 'range',
  YEARS = 'years',
  MONTHS = 'months',
  DAYS = 'days',
  REVERSE = 'reverse'
}

const PriceFlags = {
  ...BaseFlags
};
type PriceFlags = BaseFlags;

export default class Price extends Command {
  static description = 'get the price of one or more stocks, on a single date, single quarter, or range of either';

  static flags = {
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
    }),
    [PriceFlags.FULLDATE]: flags.string({
      char: 'f',
      description: `full date of interest in yyyy-m-d format. for less granularity, use --${PriceFlags.YEAR}, --${PriceFlags.MONTH}, and/or --${PriceFlags.DAY}`,
      exclusive: [PriceFlags.YEAR, PriceFlags.MONTH, PriceFlags.DAY]
    }),
    [PriceFlags.YEAR]: flags.integer({
      char: 'y',
      description: 'year of date of interest'
    }),
    [PriceFlags.MONTH]: flags.integer({
      char: 'm',
      description: 'month of date of interest'
    }),
    [PriceFlags.DAY]: flags.integer({
      char: 'd',
      description: 'day of date of interest'
    }),
    [PriceFlags.RANGE]: flags.integer({
      char: 'r',
      description: 'period of time starting from specified date of interest. default unit is month.'
    }),
    [PriceFlags.YEARS]: flags.boolean({
      char: 'Y',
      description: `used with --${PriceFlags.RANGE} to measure years`,
      dependsOn: [PriceFlags.RANGE],
      exclusive: [PriceFlags.MONTHS, PriceFlags.DAYS]
    }),
    [PriceFlags.MONTHS]: flags.boolean({
      char: 'M',
      description: `used with --${PriceFlags.RANGE} to measure months`,
      dependsOn: [PriceFlags.RANGE],
      exclusive: [PriceFlags.YEARS, PriceFlags.DAYS]
    }),
    [PriceFlags.DAYS]: flags.boolean({
      char: 'D',
      description: `used with --${PriceFlags.RANGE} to measure days`,
      dependsOn: [PriceFlags.RANGE],
      exclusive: [PriceFlags.YEARS, PriceFlags.MONTHS]
    }),
    [PriceFlags.REVERSE]: flags.boolean({
      char: 'R',
      description: `reverses --${PriceFlags.RANGE} to end (instead of starting) on the specified date of interest`,
      dependsOn: [PriceFlags.RANGE]
    })
  };

  async run() {
    const { args, flags } = this.parse(Price);

    // TODO: Add quarterly aggregation
    // TODO: fix this -> since delta functionality uses exact dates, if dates are missing right now it just returns 0
    // TODO: right now aggregation (delta or average) only happens if the user specifies a range, if this is fine then nothing todo, else change functionality

    if (flags[PriceFlags.RANGE]) { // aggregation cases
      let date1;
      let date2;
      if (flags[PriceFlags.FULLDATE]) {
        date1 = new Date(flags[PriceFlags.FULLDATE]!);
        date2 = new Date(flags[PriceFlags.FULLDATE]!);
        date2.setDate(date2.getDate() + flags[PriceFlags.RANGE]! * (flags[PriceFlags.YEARS] ? 365 : 1) * (flags[PriceFlags.MONTHS] ? 30 : 1));
      } else if (flags[PriceFlags.YEAR] && flags[PriceFlags.MONTH] && flags[PriceFlags.DAY]) {
        date1 = new Date(`${flags[PriceFlags.YEAR]}-${flags[PriceFlags.MONTH]}-${flags[PriceFlags.DAY]}`);
        date2 = new Date(`${flags[PriceFlags.YEAR]}-${flags[PriceFlags.MONTH]}-${flags[PriceFlags.DAY]}`);
        date2.setDate(date2.getDate() + flags[PriceFlags.RANGE]! * (flags[PriceFlags.YEARS] ? 365 : 1) * (flags[PriceFlags.MONTHS] ? 30 : 1));
      } else {
        this.error("Invalid input: must specify an exact date and range for aggregation");
      }
      if (flags[BaseFlags.DELTA]) { // diff case
        const diff = await TradeService.getDelta(flags[BaseFlags.SYMBOL], flags[BaseFlags.TYPE] as keyof TradeHistory, date1, date2);
        date1.setDate(date1.getDate() + 1);
        date2.setDate(date2.getDate() + 1);
        this.log(`The difference between ${date2.toDateString()} and ${date1.toDateString()} is ${diff}`);
      } else { // average case
        const avg = await TradeService.getAverage(flags[BaseFlags.SYMBOL], flags[BaseFlags.TYPE] as keyof TradeHistory, date1, date2);
        date1.setDate(date1.getDate() + 1);
        date2.setDate(date2.getDate() + 1);
        this.log(`The average value within dates ${date2.toDateString()} and ${date1.toDateString()} is ${avg}`);
      }
    } else { // no aggregation cases
      if (flags[PriceFlags.FULLDATE]) {
        const date = new Date(flags[PriceFlags.FULLDATE]!);
        const price = await TradeService.getTickerPriceWithDates(flags[BaseFlags.SYMBOL], flags[BaseFlags.TYPE] as keyof TradeHistory, date.getFullYear().toString(), (date.getMonth() + 1).toString(), (date.getDate() + 1).toString());
        price.forEach(p => this.log(p.toString()));
      } else if (flags[PriceFlags.YEAR] || flags[PriceFlags.MONTH] || flags[PriceFlags.DAY]) {
        const price = await TradeService.getTickerPriceWithDates(flags[BaseFlags.SYMBOL], flags[BaseFlags.TYPE] as keyof TradeHistory, flags[PriceFlags.YEAR]?.toString(), flags[PriceFlags.MONTH]?.toString(), flags[PriceFlags.DAY]?.toString());
        price.forEach(p => this.log(p.toString()));
      } else {
        this.error("Invalid inputs. Specify a date, and optionally a range to get an aggregation")
      }
    }
  }
}

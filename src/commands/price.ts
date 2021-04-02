import {Command, flags} from '@oclif/command'

enum PriceFlags {
  HELP = 'help',
  NAME = 'name',
  DATE = 'date',
  YEAR = 'year',
  MONTH = 'month',
  DAY = 'day',
  RANGE = 'range',
  YEARS = 'years',
  MONTHS = 'months',
  DAYS = 'days',
  REVERSE = 'reverse'
};

export default class Price extends Command {
  static description = 'get the price of a stock'

  static flags = {
    [PriceFlags.HELP]: flags.help({char: 'h'}),
    [PriceFlags.NAME]: flags.string({
      char: 'n',
      description: 'name/ticker/symbol of stock',
      multiple: true,
      required: true
    }),
    [PriceFlags.DATE]: flags.string({
      char: 'd',
      description: `full date of interest in yyyy-m-d format. for less granularity, use --${PriceFlags.YEAR}, --${PriceFlags.MONTH}, and/or --${PriceFlags.DAY}`,
      default: () => {
        const d = new Date;
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
      },
      exclusive: [PriceFlags.YEAR, PriceFlags.MONTH, PriceFlags.DAY]
    }),
    [PriceFlags.YEAR]: flags.integer({
      description: 'year of date of interest',
      default: () => {return (new Date).getFullYear()},
    }),
    [PriceFlags.MONTH]: flags.integer({
      description: 'month of date of interest',
      default: () => {return (new Date).getMonth() + 1},
    }),
    [PriceFlags.DAY]: flags.integer({
      description: 'day of date of interest',
      default: () => {return (new Date).getDate()},
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
  }

  async run() {
    const {args, flags} = this.parse(Price)

    this.log(`hello ${flags[PriceFlags.NAME]} from /Users/binilpokhrel/Documents/Code/stonk-cli/src/commands/price.ts`)
    if (flags[PriceFlags.DATE]) {
      this.log(`you input date: ${flags.date}`)
    }
  }
}

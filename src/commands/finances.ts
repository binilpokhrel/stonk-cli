import {Command, flags} from '@oclif/command';
import { CompanyAnnualFinances } from '../models/finances.model';
import * as FinanceService from '../services/finances.service';

enum BaseFlags {
  HELP = 'help',
  SYMBOL = 'symbol',
  TYPE = 'type',
  YEAR = 'year'
};

const FinanceFlags = {
  ...BaseFlags
};
type FinanceFlags = BaseFlags;

export default class Finances extends Command {
  static description = 'get the financial data of a company for stocks'

  static flags = {
    [FinanceFlags.HELP]: flags.help({ char: 'h' }),
    [FinanceFlags.SYMBOL]: flags.string({
      char: 's',
      description: 'name/ticker/symbol of stock',
      required: true
    }),
    [FinanceFlags.YEAR]: flags.string({
      char: 'y',
      description: 'year for which financial data is requested',
      required: true
    }),
    [FinanceFlags.TYPE]: flags.string({
      char: 't',
      description: 'the type of financial data requested',
      default: 'revenue',
      options: [
        'revenue',
        'revenue_growth',
        'cost_of_revenue',
        'gross_profit',
        'sga_expense',
        'operating_expense',
        'operating_income',
        'interest_expense'
      ]
    }),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Finances)

    const output = await FinanceService.getFinancialData(flags[FinanceFlags.SYMBOL], flags[FinanceFlags.YEAR], flags[FinanceFlags.TYPE] as keyof CompanyAnnualFinances);

    console.log(`${flags[FinanceFlags.TYPE]} => ${output}`);
  }
}

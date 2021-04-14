import { Command, flags } from '@oclif/command'
import { DateFlags, StaticDateFlags } from '../services/date.service';

enum BaseFlags {
  HELP = 'help',
  SYMBOL = 'symbol',
  PUBLISHER = 'publisher'
}

const NewsFlags = {
  ...DateFlags,
  ...BaseFlags
};
type NewsFlags = BaseFlags | DateFlags;

export default class News extends Command {
  static description = 'retrieve article URLs, with optional restrictions on publishers and on symbols mentioned in the articles';

  static flags = {
    ...StaticDateFlags,
    [NewsFlags.HELP]: flags.help({ char: 'h' }),
    [NewsFlags.SYMBOL]: flags.string({
      char: 's',
      description: 'name/ticker/symbol of stock(s)',
      multiple: true
    }),
    [NewsFlags.PUBLISHER]: flags.string({
      char: 'p',
      description: 'name of publisher(s) to search for',
      multiple: true
    })
  };

  async run() {
    const { args, flags } = this.parse(News);

    if (!flags[NewsFlags.PUBLISHER] && !flags[NewsFlags.SYMBOL]) {
      this.error('You must provide a publisher or a symbol!');
    }

    this.log(`hello from /Users/binilpokhrel/Documents/Code/stonk-cli/src/commands/news.ts`);
  }
}

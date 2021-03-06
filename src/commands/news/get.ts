import { Command, flags } from '@oclif/command';
import { cli } from 'cli-ux';
import { Article } from '../../models/articles.model';
import * as ArticleService from '../../services/article.service';

enum BaseFlags {
    HELP = 'help',
    SYMBOL = 'symbol',
    PUBLISHER = 'publisher',
    LIMIT = 'limit'
}

const NewsFlags = {
    ...BaseFlags
};
type NewsFlags = BaseFlags;

export default class News extends Command {
    static description = 'retrieve article URLs, with optional restrictions on publishers and on symbols mentioned in the articles';

    static flags = {
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
        }),
        [NewsFlags.LIMIT]: flags.integer({
            char: 'l',
            description: 'number of rows to return'
        })
    };

    async run() {
        const { args, flags } = this.parse(News);

        if (!flags[NewsFlags.PUBLISHER] && !flags[NewsFlags.SYMBOL]) {
            this.error('You must provide a publisher or a symbol!');
        }

        let articles: Article[];

        if (flags[NewsFlags.PUBLISHER] && flags[NewsFlags.SYMBOL]) {
            articles = await ArticleService.getUrlsByTickerAndPublisher({ tickers: flags[NewsFlags.SYMBOL], publishers: flags[NewsFlags.PUBLISHER], limit: flags[NewsFlags.LIMIT] });
        } else if (flags[NewsFlags.PUBLISHER]) {
            articles = await ArticleService.getUrlsByPublisher({ publishers: flags[NewsFlags.PUBLISHER], limit: flags[NewsFlags.LIMIT] });
        } else { // ticker only
            articles = await ArticleService.getUrlsByTicker({ tickers: flags[NewsFlags.SYMBOL], limit: flags[NewsFlags.LIMIT] });
        }

        cli.table(articles, {
            headline: {},
            date: {
                get: row => row.date.toDateString()
            },
            publisher: {},
            url: {
                header: 'URL'
            }
        });
    }
}

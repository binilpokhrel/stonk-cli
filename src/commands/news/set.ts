import { Command, flags } from '@oclif/command';
import * as UsersService from '../../services/users.service';
import * as ArticlesService from '../../services/article.service';

enum BaseFlags {
    HELP = 'help',
    URL = 'url',
    HEADLINE = 'headline',
    DATE = 'date',
    PUBLISHER = 'publisher',
    SYMBOL = 'symbol'
}

const NewsFlags = {
    ...BaseFlags
};
type NewsFlags = BaseFlags;

export default class News extends Command {
    static description = 'insert a new record of an article';

    static flags = {
        [NewsFlags.HELP]: flags.help({ char: 'h' }),
        [NewsFlags.URL]: flags.string({
            char: 'u',
            description: 'URL of article',
            required: true
        }),
        [NewsFlags.HEADLINE]: flags.string({
            char: 'l',
            description: 'headline of article',
            required: true
        }),
        [NewsFlags.DATE]: flags.string({
            char: 'd',
            description: 'date of article in yyyy-mm-dd format',
            required: true
        }),
        [NewsFlags.PUBLISHER]: flags.string({
            char: 'p',
            description: 'publisher of article',
            required: true
        }),
        [NewsFlags.SYMBOL]: flags.string({
            char: 's',
            description: 'name/ticker/symbol of stock(s) mentioned in the article',
            multiple: true
        }),
    };

    async run() {
        const { args, flags } = this.parse(News);

        if (!await UsersService.checkUserLoggedIn()) {
            this.error('please login using user command first', { suggestions: ['user -h'] });
        }

        if (!await UsersService.getCurrentUserPriv()) {
            this.error('Current user does not have write permissions on database');
        }

        const params = {
            url: flags[NewsFlags.URL],
            tickers: flags[NewsFlags.SYMBOL],
            headline: flags[NewsFlags.HEADLINE],
            publisher: flags[NewsFlags.PUBLISHER],
            date: flags[NewsFlags.DATE]
        };

        const { results: articles, error: article_error } = await ArticlesService.setArticle(params);
        if (article_error) {
            this.error('Could not add new article. Make sure the url starts with http and that the date is valid. If a stock ticker was supplied, make sure it exists already.');
        } else {
            this.log('Article added successfully!');
        }
    }
}

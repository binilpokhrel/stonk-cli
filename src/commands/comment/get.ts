import { Command, flags } from '@oclif/command';
import { cli } from 'cli-ux';
import * as CommentsService from '../../services/comment.service';

enum BaseFlags {
    HELP = 'help',
    SYMBOL = 'symbol',
    TAG = 'tag',
    TYPE = 'type',
    USER_ID = 'user_id'
}

const CommentFlags = {
    ...BaseFlags
};
type CommentFlags = BaseFlags;

export default class Comment extends Command {
    static description = 'find comments about a given article, company, or trade history';

    static flags = {
        [CommentFlags.HELP]: flags.help({ char: 'h' }),
        [CommentFlags.SYMBOL]: flags.string({
            char: 's',
            description: 'name/ticker/symbol of stock(s)',
            multiple: true,
            required: true
        }),
        [CommentFlags.TAG]: flags.string({
            char: 'T',
            description: 'limit search to provided tag(s)',
            multiple: true
        }),
        [CommentFlags.TYPE]: flags.string({
            char: 't',
            description: 'type of comment to search for',
            options: ['finance', 'article', 'history']
        }),
        [CommentFlags.USER_ID]: flags.integer({
            char: 'u',
            description: 'only find comments from the given user id'
        })
    };

    static args = [
        {
            name: 'param',
            description: 'used with --type flag to specify a specific fiscal year (finance), url (article), or trade date (history)'
        }
    ]

    async run() {
        const { args, flags } = this.parse(Comment);

        const params = {
            uID: flags[CommentFlags.USER_ID],
            tickers: flags[CommentFlags.SYMBOL],
            tags: flags[CommentFlags.TAG],
            type: flags[CommentFlags.TYPE],
            specialization: args.param
        }

        const { results: comments, error: comment_error } = await CommentsService.getComments(params);

        if (comment_error) {
            this.error(`from server while trying to get comments: ${comment_error.message}`);
        } else {
            if (comments!.length == 0) {
                this.log('No results matched that query.');
                return;
            }

            const columns = [
                'Comment ID',
                'Author',
                'Last Updated At',
                'Message',
                'Tickers'
            ];
            if (flags[CommentFlags.TAG]) { columns.push('Tags') };
            if (flags[CommentFlags.TYPE]) {
                switch (flags[CommentFlags.TYPE]) {
                    case 'finance':
                        columns.push('Fiscal Year');
                        break;
                    case 'article':
                        columns.push('URL');
                        break;
                    case 'history':
                        columns.push('Trade Date');
                        break;
                    default:
                        break;
                }
            }

            cli.table(comments!, {
                comment_id: {
                    header: 'Comment ID'
                },
                author: {},
                last_updated_at: {
                    header: 'Last Updated At',
                    get: row => row.last_updated_at.toLocaleString()
                },
                message: {},
                tickers: {},
                tags: {},
                fiscal_year: {
                    header: 'Fiscal Year'
                },
                url: {
                    header: 'URL'
                },
                trade_date: {
                    header: 'Trade Date'
                }
            }, {
                columns: columns.join(',')
            });

            // comments!.forEach(comment => console.log(JSON.stringify(comment)));
        }

    }
}

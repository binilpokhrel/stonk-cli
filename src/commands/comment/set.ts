import { Command, flags } from '@oclif/command';
import * as CommentsService from '../../services/comment.service';
import * as UsersService from '../../services/users.service';

enum BaseFlags {
    HELP = 'help',
    SYMBOL = 'symbol',
    TAG = 'tag',
    TYPE = 'type',
    MESSAGE = 'message'
}

const CommentFlags = {
    ...BaseFlags
};
type CommentFlags = BaseFlags;

export default class Comment extends Command {
    static description = 'create comments about a given article, company, or trade history';

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
        [CommentFlags.MESSAGE]: flags.string({
            char: 'm',
            description: 'comment message',
            required: true
        })
    };

    static args = [
        {
            name: 'param',
            description: 'fiscal year (finance), url (article), or trade date (history)'
        }
    ]

    async run() {
        const { args, flags } = this.parse(Comment);

        const priv = await UsersService.getCurrentUserPriv();
        if (!priv) {
            this.error('You must be logged in as a privileged user to create comments!', {suggestions: ['user -h']})
        }

        if (!args.param) {
            switch (flags[CommentFlags.TYPE]) {
                case 'finance': {
                    this.error('You must provide a fiscal year as an argument for a finance comment!');
                }
                case 'article': {
                    this.error('You must provide a url as an argument for an article comment!');
                }
                case 'history': {
                    this.error('You must provide a trade date as an argument for a history comment!');
                }
            }
        }

        const params = {
            message: flags[CommentFlags.MESSAGE],
            tickers: flags[CommentFlags.SYMBOL],
            tags: flags[CommentFlags.TAG],
            type: flags[CommentFlags.TYPE],
            specialization: args.param
        }
        
        const {results: comments, error: comment_error} = await CommentsService.setComment(params);

        if (comment_error) {
            this.error(`from server while trying to add comment: ${comment_error.message}`);
        } else {
            this.log(`Comment added successfully with id ${(<any>comments![0]).insertId}`)
        }
    }
}

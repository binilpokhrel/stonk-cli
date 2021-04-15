import { Command, flags } from '@oclif/command'
import { DateFlags, StaticDateFlags } from '../../services/date.service';

enum BaseFlags {
    HELP = 'help',
    SYMBOL = 'symbol',
    TAG = 'tag',
    TYPE = 'type'
}

const CommentFlags = {
    ...DateFlags,
    ...BaseFlags
};
type CommentFlags = BaseFlags | DateFlags;

export default class Comment extends Command {
    static description = 'find comments about a given article, company, or trade history';

    static flags = {
        ...StaticDateFlags,
        [CommentFlags.HELP]: flags.help({ char: 'h' }),
        [CommentFlags.SYMBOL]: flags.string({
            char: 's',
            description: 'name/ticker/symbol of stock(s)',
            multiple: true
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
    };

    async run() {
        const { args, flags } = this.parse(Comment);

        if (!flags[CommentFlags.TAG] && !flags[CommentFlags.SYMBOL]) {
            this.error('You must provide a tag or a symbol!');
        }
        
    }
}

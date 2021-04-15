import { Command, flags } from '@oclif/command';
import { DateFlags, StaticDateFlags } from '../../services/date.service';
import { createReadStream } from 'fs';

enum BaseFlags {
    HELP = 'help',
    ESCAPE = 'escape'
}

const NewsFlags = {
    ...DateFlags,
    ...BaseFlags
};
type NewsFlags = BaseFlags | DateFlags;

export default class News extends Command {
    static description = 'set article URLs, with optional restrictions on publishers and on symbols mentioned in the articles';

    static flags = {
        ...StaticDateFlags,
        [NewsFlags.HELP]: flags.help({ char: 'h' }),
    };

    static args = [
        {
            name: 'file',
            required: true,
            description: 'csv with headline,url,publisher,date,stock information'
        }
    ];

    async run() {
        const { args, flags } = this.parse(News);

        if (!args.file) {
            this.error('You must provide a filepath!');
        }

    }
}

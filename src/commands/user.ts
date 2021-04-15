import {Command, flags} from '@oclif/command';
import { Users } from '../models/users.model'
import * as UsersService from '../services/users.service';
import { writeFileSync } from 'fs';

enum BaseFlags {
  NAME = 'name',
  REGISTER = 'register',
  PRIV = 'priv'
};

const userFlags = {
  ...BaseFlags
};
type userFlags = BaseFlags;

export default class User extends Command {
  static description = 'describe the command here'

  static flags = {
    [userFlags.NAME]: flags.string({char: 'n', description: 'username', required: true}),
    [userFlags.REGISTER]: flags.boolean({
      char: 'r',
      description: 'use this flag to specify that we wish for this user to be registered'
    }),
    [userFlags.PRIV]: flags.boolean({
      char: 'p',
      description: 'specify this flag when registering to give user write access',
      dependsOn: [userFlags.REGISTER]
    })
  }

  async run() {
    const {args, flags} = this.parse(User)

    if(flags[userFlags.REGISTER]) { // register and login
      await UsersService.registerUser(flags[userFlags.NAME], flags[userFlags.PRIV]);
    }

    const userData = await UsersService.getUserData(flags.name);
    if (userData == null) { // an entry for the user didn't exist
      this.error(`user ${flags[userFlags.NAME]} does not exist, please register by running the same command with '-r' flag`);
    }
    let id = userData.user_id;
    let name = userData.name;
    let priv = userData.priv;

    writeFileSync('config.txt', `${id},${name},${priv}`);

    this.log(`Successfully logged in as: ${name}`);

  }
}

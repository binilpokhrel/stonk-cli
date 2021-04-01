stonk-cli
=========

cli for querying all the stonks

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/stonk-cli.svg)](https://npmjs.org/package/stonk-cli)
[![Codecov](https://codecov.io/gh/binilpokhrel/stonk-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/binilpokhrel/stonk-cli)
[![Downloads/week](https://img.shields.io/npm/dw/stonk-cli.svg)](https://npmjs.org/package/stonk-cli)
[![License](https://img.shields.io/npm/l/stonk-cli.svg)](https://github.com/binilpokhrel/stonk-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g stonk-cli
$ stonk-cli COMMAND
running command...
$ stonk-cli (-v|--version|version)
stonk-cli/0.0.0 darwin-x64 node-v15.13.0
$ stonk-cli --help [COMMAND]
USAGE
  $ stonk-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`stonk-cli hello [FILE]`](#stonk-cli-hello-file)
* [`stonk-cli help [COMMAND]`](#stonk-cli-help-command)
* [`stonk-cli price [FILE]`](#stonk-cli-price-file)

## `stonk-cli hello [FILE]`

describe the command here

```
USAGE
  $ stonk-cli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ stonk-cli hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.0/src/commands/hello.ts)_

## `stonk-cli help [COMMAND]`

display help for stonk-cli

```
USAGE
  $ stonk-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `stonk-cli price [FILE]`

describe the command here

```
USAGE
  $ stonk-cli price [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/price.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.0/src/commands/price.ts)_
<!-- commandsstop -->

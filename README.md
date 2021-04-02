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
* [`stonk-cli price`](#stonk-cli-price)

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

## `stonk-cli price`

get the price of a stock

```
USAGE
  $ stonk-cli price

OPTIONS
  -D, --days         used with --range to measure days
  -M, --months       used with --range to measure months
  -R, --reverse      reverses --range to end (instead of starting) on the specified date of interest
  -Y, --years        used with --range to measure years

  -d, --date=date    [default: 2021-4-1] full date of interest in yyyy-m-d format. for less granularity, use --year,
                     --month, and/or --day

  -h, --help         show CLI help

  -n, --name=name    (required) name/ticker/symbol of stock

  -r, --range=range  period of time starting from specified date of interest. default unit is month.

  --day=day          [default: 1] day of date of interest

  --month=month      [default: 4] month of date of interest

  --year=year        [default: 2021] year of date of interest
```

_See code: [src/commands/price.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.0/src/commands/price.ts)_
<!-- commandsstop -->

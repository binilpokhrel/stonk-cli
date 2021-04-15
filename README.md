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
* [`stonk-cli comment:get`](#stonk-cli-commentget)
* [`stonk-cli comment:set [PARAM]`](#stonk-cli-commentset-param)
* [`stonk-cli hello [FILE]`](#stonk-cli-hello-file)
* [`stonk-cli help [COMMAND]`](#stonk-cli-help-command)
* [`stonk-cli ipo`](#stonk-cli-ipo)
* [`stonk-cli news:get`](#stonk-cli-newsget)
* [`stonk-cli news:set FILE`](#stonk-cli-newsset-file)
* [`stonk-cli price`](#stonk-cli-price)
* [`stonk-cli user`](#stonk-cli-user)

## `stonk-cli comment:get`

find comments about a given article, company, or trade history

```
USAGE
  $ stonk-cli comment:get

OPTIONS
  -D, --days                          used with --range to measure days
  -M, --months                        used with --range to measure months
  -R, --reverse                       reverses --range to end (instead of starting) on the specified date of interest
  -T, --tag=tag                       limit search to provided tag(s)
  -Y, --years                         used with --range to measure years
  -d, --day=day                       day of date of interest

  -f, --full-date=full-date           full date of interest in yyyy-m-d format. for less granularity, use --year,
                                      --month, and/or --day

  -h, --help                          show CLI help

  -m, --month=month                   month of date of interest

  -r, --range=range                   period of time starting from specified date of interest. default unit is month.

  -s, --symbol=symbol                 name/ticker/symbol of stock(s)

  -t, --type=finance|article|history  type of comment to search for

  -y, --year=year                     year of date of interest
```

_See code: [src/commands/comment/get.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.0/src/commands/comment/get.ts)_

## `stonk-cli comment:set [PARAM]`

create comments about a given article, company, or trade history

```
USAGE
  $ stonk-cli comment:set [PARAM]

ARGUMENTS
  PARAM  fiscal year (finance), url (article), or trade date (history)

OPTIONS
  -T, --tag=tag                       limit search to provided tag(s)
  -h, --help                          show CLI help
  -m, --message=message               (required) comment message
  -s, --symbol=symbol                 name/ticker/symbol of stock(s)
  -t, --type=finance|article|history  type of comment to search for
```

_See code: [src/commands/comment/set.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.0/src/commands/comment/set.ts)_

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

## `stonk-cli ipo`

describe the command here

```
USAGE
  $ stonk-cli ipo

OPTIONS
  -h, --help                                                        show CLI help
  -s, --symbol=symbol                                               (required) name/ticker/symbol of stock
  -t, --type=ipo_date|high_day_0|open_day_0|low_day_0|volume_day_0  [default: ipo_date] the type of ipo data requested
```

_See code: [src/commands/ipo.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.0/src/commands/ipo.ts)_

## `stonk-cli news:get`

retrieve article URLs, with optional restrictions on publishers and on symbols mentioned in the articles

```
USAGE
  $ stonk-cli news:get

OPTIONS
  -D, --days                 used with --range to measure days
  -M, --months               used with --range to measure months
  -R, --reverse              reverses --range to end (instead of starting) on the specified date of interest
  -Y, --years                used with --range to measure years
  -d, --day=day              day of date of interest

  -f, --full-date=full-date  full date of interest in yyyy-m-d format. for less granularity, use --year, --month, and/or
                             --day

  -h, --help                 show CLI help

  -l, --limit=limit          number of rows to return

  -m, --month=month          month of date of interest

  -p, --publisher=publisher  name of publisher(s) to search for

  -r, --range=range          period of time starting from specified date of interest. default unit is month.

  -s, --symbol=symbol        name/ticker/symbol of stock(s)

  -y, --year=year            year of date of interest
```

_See code: [src/commands/news/get.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.0/src/commands/news/get.ts)_

## `stonk-cli news:set FILE`

set article URLs, with optional restrictions on publishers and on symbols mentioned in the articles

```
USAGE
  $ stonk-cli news:set FILE

ARGUMENTS
  FILE  csv with headline,url,publisher,date,stock information

OPTIONS
  -D, --days                 used with --range to measure days
  -M, --months               used with --range to measure months
  -R, --reverse              reverses --range to end (instead of starting) on the specified date of interest
  -Y, --years                used with --range to measure years
  -d, --day=day              day of date of interest

  -f, --full-date=full-date  full date of interest in yyyy-m-d format. for less granularity, use --year, --month, and/or
                             --day

  -h, --help                 show CLI help

  -m, --month=month          month of date of interest

  -r, --range=range          period of time starting from specified date of interest. default unit is month.

  -y, --year=year            year of date of interest
```

_See code: [src/commands/news/set.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.0/src/commands/news/set.ts)_

## `stonk-cli price`

get the price of one or more stocks, on a single date, single quarter, or range of either

```
USAGE
  $ stonk-cli price

OPTIONS
  -D, --days                                used with --range to measure days
  -M, --months                              used with --range to measure months

  -R, --reverse                             reverses --range to end (instead of starting) on the specified date of
                                            interest

  -Y, --years                               used with --range to measure years

  -d, --day=day                             day of date of interest

  -f, --full-date=full-date                 full date of interest in yyyy-m-d format. for less granularity, use --year,
                                            --month, and/or --day

  -h, --help                                show CLI help

  -m, --month=month                         month of date of interest

  -r, --range=range                         period of time starting from specified date of interest. default unit is
                                            month.

  -s, --symbol=symbol                       (required) name/ticker/symbol of stock

  -t, --type=open|close|high|low|adj_close  (required) [default: open] which price of the day. options are: open, close,
                                            high, low, adjclose

  -w, --delta                               use this flag to specify finding the absolute difference between the values
                                            at the ends of a range

  -y, --year=year                           year of date of interest
```

_See code: [src/commands/price.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.0/src/commands/price.ts)_

## `stonk-cli user`

describe the command here

```
USAGE
  $ stonk-cli user

OPTIONS
  -n, --name=name  (required) username or fullname
  -p, --priv       specify this flag when registering to give user write access
  -r, --register   use this flag to specify that we wish for this user to be registered
```

_See code: [src/commands/user.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.0/src/commands/user.ts)_
<!-- commandsstop -->

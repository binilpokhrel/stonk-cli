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
stonk-cli/0.0.1 darwin-x64 node-v15.13.0
$ stonk-cli --help [COMMAND]
USAGE
  $ stonk-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`stonk-cli comment:get [PARAM]`](#stonk-cli-commentget-param)
* [`stonk-cli comment:set [PARAM]`](#stonk-cli-commentset-param)
* [`stonk-cli finances [FILE]`](#stonk-cli-finances-file)
* [`stonk-cli help [COMMAND]`](#stonk-cli-help-command)
* [`stonk-cli ipo:get`](#stonk-cli-ipoget)
* [`stonk-cli ipo:set`](#stonk-cli-iposet)
* [`stonk-cli news:get`](#stonk-cli-newsget)
* [`stonk-cli news:set`](#stonk-cli-newsset)
* [`stonk-cli price:get`](#stonk-cli-priceget)
* [`stonk-cli price:set`](#stonk-cli-priceset)
* [`stonk-cli user`](#stonk-cli-user)

## `stonk-cli comment:get [PARAM]`

find comments about a given article, company, or trade history

```
USAGE
  $ stonk-cli comment:get [PARAM]

ARGUMENTS
  PARAM  used with --type flag to specify a specific fiscal year (finance), url (article), or trade date (history)

OPTIONS
  -T, --tag=tag                       limit search to provided tag(s)
  -h, --help                          show CLI help
  -s, --symbol=symbol                 (required) name/ticker/symbol of stock(s)
  -t, --type=finance|article|history  type of comment to search for
  -u, --user_id=user_id               only find comments from the given user id
```

_See code: [src/commands/comment/get.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.1/src/commands/comment/get.ts)_

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
  -s, --symbol=symbol                 (required) name/ticker/symbol of stock(s)
  -t, --type=finance|article|history  type of comment to search for
```

_See code: [src/commands/comment/set.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.1/src/commands/comment/set.ts)_

## `stonk-cli finances [FILE]`

get the financial data of a company for stocks

```
USAGE
  $ stonk-cli finances [FILE]

OPTIONS
  -h, --help
      show CLI help

  -s, --symbol=symbol
      (required) name/ticker/symbol of stock

  -t, 
  --type=revenue|revenue_growth|cost_of_revenue|gross_profit|sga_expense|operating_expense|operating_income|interest_exp
  ense
      [default: revenue] the type of financial data requested

  -y, --year=year
      (required) year for which financial data is requested
```

_See code: [src/commands/finances.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.1/src/commands/finances.ts)_

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

## `stonk-cli ipo:get`

get ipo data related to a particular stock

```
USAGE
  $ stonk-cli ipo:get

OPTIONS
  -h, --help                                                                    show CLI help
  -s, --symbol=symbol                                                           (required) name/ticker/symbol of stock

  -t, --type=ipo_date|high_day_0|open_day_0|low_day_0|volume_day_0|close_day_0  [default: ipo_date] the type of ipo data
                                                                                requested
```

_See code: [src/commands/ipo/get.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.1/src/commands/ipo/get.ts)_

## `stonk-cli ipo:set`

add a new stock and its ipo data to the database

```
USAGE
  $ stonk-cli ipo:set

OPTIONS
  -c, --close=close    (required) closing value of the stock on the first day.
  -d, --date=date      (required) ipo date of the stock. must be of format yyyy-mm-dd
  -h, --help           show CLI help
  -l, --low=low        (required) lowest value of the stock on the first day.
  -o, --open=open      (required) opening value of the stock on the first day.
  -s, --symbol=symbol  (required) name/ticker/symbol of stock
  -u, --high=high      (required) highest value of the stock on the first day.
  -v, --volume=volume  (required) volume of the stock on the first day.
```

_See code: [src/commands/ipo/set.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.1/src/commands/ipo/set.ts)_

## `stonk-cli news:get`

retrieve article URLs, with optional restrictions on publishers and on symbols mentioned in the articles

```
USAGE
  $ stonk-cli news:get

OPTIONS
  -h, --help                 show CLI help
  -l, --limit=limit          number of rows to return
  -p, --publisher=publisher  name of publisher(s) to search for
  -s, --symbol=symbol        name/ticker/symbol of stock(s)
```

_See code: [src/commands/news/get.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.1/src/commands/news/get.ts)_

## `stonk-cli news:set`

insert a new record of an article

```
USAGE
  $ stonk-cli news:set

OPTIONS
  -d, --date=date            (required) date of article in yyyy-mm-dd format
  -h, --help                 show CLI help
  -l, --headline=headline    (required) headline of article
  -p, --publisher=publisher  (required) publisher of article
  -s, --symbol=symbol        name/ticker/symbol of stock(s) mentioned in the article
  -u, --url=url              (required) URL of article
```

_See code: [src/commands/news/set.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.1/src/commands/news/set.ts)_

## `stonk-cli price:get`

get the price of one or more stocks, on a single date, single quarter, or range of either

```
USAGE
  $ stonk-cli price:get

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

  -t, --type=open|close|high|low|adj_close  [default: open] which price of the day. options are: open, close, high, low,
                                            adjclose

  -w, --delta                               use this flag to specify finding the absolute difference between the values
                                            at the ends of a range

  -y, --year=year                           year of date of interest
```

_See code: [src/commands/price/get.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.1/src/commands/price/get.ts)_

## `stonk-cli price:set`

set the daily values of a single stock

```
USAGE
  $ stonk-cli price:set

OPTIONS
  -a, --adj_close=adj_close  (required) adjusted cloding value of the stock on the day.
  -c, --close=close          (required) closing value of the stock on the day.
  -d, --date=date            (required) full date of interest in yyyy-mm-dd format.
  -h, --help                 show CLI help
  -l, --low=low              (required) lowest value of the stock on the day.
  -o, --open=open            (required) opening value of the stock on the day.
  -s, --symbol=symbol        (required) name/ticker/symbol of stock
  -u, --high=high            (required) highest value of the stock on the day.
  -v, --volume=volume        (required) volume of stocks on the day.
```

_See code: [src/commands/price/set.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.1/src/commands/price/set.ts)_

## `stonk-cli user`

log in as a new or existing user

```
USAGE
  $ stonk-cli user

OPTIONS
  -n, --name=name  (required) username or fullname
  -p, --priv       specify this flag when registering to give user write access
  -r, --register   use this flag to specify that we wish for this user to be registered
```

_See code: [src/commands/user.ts](https://github.com/binilpokhrel/stonk-cli/blob/v0.0.1/src/commands/user.ts)_
<!-- commandsstop -->

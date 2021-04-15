import { flags } from "@oclif/command";

export enum DateFlags {
    FULLDATE = 'full-date',
    YEAR = 'year',
    MONTH = 'month',
    DAY = 'day',
    RANGE = 'range',
    YEARS = 'years',
    MONTHS = 'months',
    DAYS = 'days',
    REVERSE = 'reverse'
}

export const StaticDateFlags = {
    [DateFlags.FULLDATE]: flags.string({
        char: 'f',
        description: `full date of interest in yyyy-m-d format. for less granularity, use --${DateFlags.YEAR}, --${DateFlags.MONTH}, and/or --${DateFlags.DAY}`,
        exclusive: [DateFlags.YEAR, DateFlags.MONTH, DateFlags.DAY]
    }),
    [DateFlags.YEAR]: flags.integer({
        char: 'y',
        description: 'year of date of interest'
    }),
    [DateFlags.MONTH]: flags.integer({
        char: 'm',
        description: 'month of date of interest'
    }),
    [DateFlags.DAY]: flags.integer({
        char: 'd',
        description: 'day of date of interest'
    }),
    [DateFlags.RANGE]: flags.integer({
        char: 'r',
        description: 'period of time starting from specified date of interest. default unit is month.'
    }),
    [DateFlags.YEARS]: flags.boolean({
        char: 'Y',
        description: `used with --${DateFlags.RANGE} to measure years`,
        dependsOn: [DateFlags.RANGE],
        exclusive: [DateFlags.MONTHS, DateFlags.DAYS]
    }),
    [DateFlags.MONTHS]: flags.boolean({
        char: 'M',
        description: `used with --${DateFlags.RANGE} to measure months`,
        dependsOn: [DateFlags.RANGE],
        exclusive: [DateFlags.YEARS, DateFlags.DAYS]
    }),
    [DateFlags.DAYS]: flags.boolean({
        char: 'D',
        description: `used with --${DateFlags.RANGE} to measure days`,
        dependsOn: [DateFlags.RANGE],
        exclusive: [DateFlags.YEARS, DateFlags.MONTHS]
    }),
    [DateFlags.REVERSE]: flags.boolean({
        char: 'R',
        description: `reverses --${DateFlags.RANGE} to end (instead of starting) on the specified date of interest`,
        dependsOn: [DateFlags.RANGE]
    })
}

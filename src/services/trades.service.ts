import { TradeHistory } from "../models/trades.model";
import { connect, listAsValues } from "./base.service";

export const getTickerPriceByRange = async (ticker: string, priceType: keyof TradeHistory, startDate: Date, endDate: Date) => {
    const db = await connect();
    const query =
        `SELECT ${priceType} FROM trade_histories 
            where ticker="${ticker}" 
            and trade_date > CAST( '${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()+1}' as datetime)
            and trade_date < CAST( '${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()+1}' as datetime)`;

    console.log(query);

    const [rows, fields] = await db.execute(query);
 
    db.destroy();

    return rows as TradeHistory[]
}

export const getTickerPrice = async (ticker: string, priceType: keyof TradeHistory, year?: string, month?: string, day?: string) => {
    const db = await connect();
    const query =
        `SELECT trade_date, ${priceType} FROM trade_histories 
            where ticker="${ticker}" 
            ${year ? `and year(trade_date)=${year} ` : ''}
            ${month ? `and month(trade_date)=${month} ` : ''}
            ${day ? `and day(trade_date)=${day}` : ''}`;

    console.log(query);

    const [rows, fields] = await db.execute(query);
 
    db.destroy();

    return rows as TradeHistory[]
}

export const getTickerPriceWithDates = async (ticker: string, priceType: keyof TradeHistory, year?: string, month?: string, day?: string) => {
    const rows = await getTickerPrice(ticker, priceType, year, month, day);

    return (rows).map(row => `${new Date(row.trade_date).toDateString()} => ${row[priceType]}`);
}

export const getDelta = async (ticker: string, priceType: keyof TradeHistory, date1: Date, date2: Date) => {
    const price1 = await getTickerPrice(ticker, priceType, date1.getFullYear().toString(), (date1.getMonth()+1).toString(), (date1.getDate()+1).toString());
    const price2 = await getTickerPrice(ticker, priceType, date2.getFullYear().toString(), (date2.getMonth()+1).toString(), (date2.getDate()+1).toString());

    if(price1.length != 1 || price2.length != 1) {
        return 0;
    }

    return (price2[0][priceType] as number) - (price1[0][priceType] as number);
}

export const getAverage = async (ticker: string, priceType: keyof TradeHistory, startDate: Date, endDate: Date) => {
    const rows = await getTickerPriceByRange(ticker, priceType, startDate, endDate);
    let sum = 0;
    for (let i = 0; i < rows.length; i++) {
        sum += rows[i][priceType] as number
    }

    return sum / rows.length
}
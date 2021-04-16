import { Stock } from "../models/stocks.model";
import { connect } from "./base.service";

export const getIpoData = async (ticker: string, type: keyof Stock) => {
    const db = await connect();

    const query =
        `SELECT ${type} FROM stocks where ticker="${ticker}"`;

    const [rows, fields] = await db.execute(query);
 
    db.destroy();
    
    if ((rows as Stock[]).length != 1) {
        return Error;
    }

    return (rows as Stock[])[0][type];
}

export const createNewStock = async (ticker: string, high: string, low: string, open: string, close: string, volume: string, date: string) => {
    const db = await connect();

    const query =
        `INSERT INTO stocks VALUES ('${ticker}', CAST('${date}' as datetime), ${close}, ${high}, ${open}, ${low}, ${volume})`;

    const [rows, fields] = await db.execute(query);
 
    db.destroy();
    
    return;
}
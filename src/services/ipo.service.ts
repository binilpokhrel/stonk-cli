import { Stock } from "../models/stocks.model";
import { connect } from "./base.service";

export const getIpoData = async (ticker: string, type: keyof Stock) => {
    const db = await connect();

    const query =
        `SELECT ${type} FROM stocks where ticker="${ticker}"`;

    console.log(query);

    const [rows, fields] = await db.execute(query);
 
    db.destroy();
    
    if ((rows as Stock[]).length != 1) {
        return Error;
    }

    return (rows as Stock[])[0][type];
}
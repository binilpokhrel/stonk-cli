import { Article } from "../models/articles.model";
import { connect, listAsValues } from "./base.service";

export const getUrlsByTicker = async (tickers: string[], limit?: number) => {
    const db = await connect();

    const query =
        `SELECT url FROM article_tickers where ticker in ${listAsValues(tickers)} ${limit ? 'limit ' + limit : ''}`;

    console.log(query);

    const [rows, fields] = await db.execute(query);
 
    db.destroy();
    
    return (rows as Article[]).map(row => row.url);
}
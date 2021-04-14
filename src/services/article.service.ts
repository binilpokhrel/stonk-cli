import { Article } from "../models/articles.model";
import { connect, limitIfExists, listAsValues } from "./base.service";

export const getUrlsByTicker = async (params: {tickers: string[], limit?: number}) => {
    const db = await connect();

    const query =
        `SELECT url, headline, date, publisher FROM article_tickers where ticker in ${listAsValues(params.tickers)} ${limitIfExists(params.limit)}`;

    console.log(query);

    const [rows, fields] = await db.execute(query);
 
    db.destroy();
    
    return (rows as Article[]);
}

export const getUrlsByPublisher = async (params: {publishers: string[], limit?: number}) => {
    const db = await connect();

    const query =
        `SELECT url, headline, date, publisher FROM articles where publisher in ${listAsValues(params.publishers)} ${limitIfExists(params.limit)}`;

    console.log(query);

    const [rows, fields] = await db.execute(query);
 
    db.destroy();
    
    return (rows as Article[]);
}

export const getUrlsByTickerAndPublisher = async (params: {tickers: string[], publishers: string[], limit?: number}) => {
    const db = await connect();

    const query =
        `SELECT DISTINCT
            articles.url,
            articles.headline,
            articles.date,
            articles.publisher
        FROM article_tickers
        INNER JOIN articles USING(url)
        WHERE ticker IN ${listAsValues(params.tickers)}
        AND publisher IN ${listAsValues(params.publishers)}
        ${limitIfExists(params.limit)}`;

    console.log(query);

    const [rows, fields] = await db.execute(query);
 
    db.destroy();
    
    return (rows as Article[]);
}
import { Article } from "../models/articles.model";
import { asArray, connect, limitIfExists, listAsValues } from "./base.service";

export const getUrlsByTicker = async (params: {tickers: string[], limit?: number}) => {
    const db = await connect();

    const query =
        `SELECT articles.url, headline, date, publisher FROM articles INNER JOIN article_tickers USING (url) WHERE ticker IN ${listAsValues(params.tickers)} ${limitIfExists(params.limit)}`;

    // console.log(query);

    const [rows, fields] = await db.execute(query);
 
    db.destroy();
    
    return (asArray(rows) as Article[]);
}

export const getUrlsByPublisher = async (params: {publishers: string[], limit?: number}) => {
    const db = await connect();

    const query =
        `SELECT url, headline, date, publisher FROM articles WHERE publisher IN ${listAsValues(params.publishers)} ${limitIfExists(params.limit)}`;

    // console.log(query);

    const [rows, fields] = await db.execute(query);
 
    db.destroy();
    
    return (asArray(rows) as Article[]);
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

    // console.log(query);

    const [rows, fields] = await db.execute(query);
 
    db.destroy();
    
    return (asArray(rows) as Article[]);
}

export const setArticle = async (
    params: { tickers?: string[], url: string, headline: string, publisher: string, date: string}
): Promise<{ results?: any[], error?: Error }> => {
    const db = await connect();

    const queries: string[] = [];
    queries.push(
        `INSERT INTO articles
         VALUES ('${params.url}', '${params.headline}', CAST('${params.date}' as datetime), '${params.publisher}')  
        `
    );

    if (params.tickers) {
        params.tickers.forEach(ticker => {
            queries.push(
                `INSERT INTO article_tickers
                 VALUES ('${params.url}', '${ticker}')
                `
            );
        })
    }

    await db.beginTransaction();
    let rows, fields;
    try {
        for (let i = 0; i < queries.length; i++) {
            const query = queries[i];
            if (query && query.length > 0) {
                // console.log(query);
                if (i == 0) {
                    [rows, fields] = await db.execute(query);
                } else {
                    await db.execute(query);
                }
            }
        }
        db.commit();
    } catch (e) {
        db.rollback();
        return { error: e }
    }

    db.destroy();

    return {results: asArray(rows as Article[])};


}
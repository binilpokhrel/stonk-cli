import { GeneralComment } from "../models/comments.model";
import { asArray, connect } from "./base.service";

export const setComment = async (params: {message: string, tickers: string[], tags: string[], type?: string, specialization: string}) => {
    const db = await connect();

    let queries: string[] = [];

    queries[0] =
        `INSERT INTO comments 
            (user_id, created_at, last_updated_at, message)
        VALUES
            (${'1'}, NOW(), NOW(), '${params.message}')`;
    
    queries.push(`SET @last_comment_id = LAST_INSERT_ID()`);

    let specialization_query = '';
    switch (params.type) {
        case 'finance': {
            console.log("finance");
            specialization_query = `INSERT INTO finance_comments VALUES (@last_comment_id, ${Number(params.specialization)})`;
            break;
        }
        case 'article': {
            console.log("article");
            specialization_query = `INSERT INTO article_comments VALUES (@last_comment_id, '${params.specialization}')`;
            break;
        }
        case 'history': {
            console.log("history");
            specialization_query = `INSERT INTO history_comments VALUES (@last_comment_id, CAST('${params.specialization}' as datetime))`;
            break;
        }
    }
    queries.push(specialization_query);

    if (params.tickers) {
        queries.push(
            `INSERT INTO comment_tickers
            VALUES ${params.tickers.map(ticker => `(@last_comment_id, '${ticker}')`).join(",")}`
        );
    }

    if (params.tags) {
        queries.push(
            `INSERT INTO comment_tags
            VALUES ${params.tags.map(tag => `(@last_comment_id, '${tag}')`).join(",")}`
        )
    }

    await db.beginTransaction();
    let rows, fields
    try {
        console.log("try");
        for (let i = 0; i < queries.length; i++) {
            const query = queries[i];
            if (query && query.length > 0) {
                console.log(query);
                if (i == 0) {
                    [rows, fields] = await db.execute(query);
                } else {
                    await db.execute(query);
                }
            }
        }
        db.commit();
        console.log("committed");
    } catch (e) {
        console.log("caught err");
        console.error(e);
        db.rollback();
    } finally {
        console.log("finally");

        db.destroy();
    }
 
    return (asArray(rows) as GeneralComment[])
}
import { GeneralComment } from "../models/comments.model";
import { asArray, connect } from "./base.service";
import * as UsersService from './users.service';


export const setComment = async (
    params: {message: string, tickers: string[], tags: string[], type?: string, specialization: string}
): Promise<{results?: GeneralComment[], error?: Error}> => {
    const db = await connect();

    const user_id = await UsersService.getCurrentUserId();

    let queries: string[] = [];

    queries[0] =
        `INSERT INTO comments 
            (user_id, created_at, last_updated_at, message)
        VALUES
            (${user_id}, NOW(), NOW(), '${params.message}')`;
    
    queries.push(`SET @last_comment_id = LAST_INSERT_ID()`);

    let specialization_query = '';
    switch (params.type) {
        case 'finance': {
            specialization_query = `INSERT INTO finance_comments VALUES (@last_comment_id, ${Number(params.specialization)})`;
            break;
        }
        case 'article': {
            specialization_query = `INSERT INTO article_comments VALUES (@last_comment_id, '${params.specialization}')`;
            break;
        }
        case 'history': {
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
    } catch (e) {
        db.rollback();
        return {error: e}
    }
 
    db.destroy();
    return {results: (asArray(rows) as GeneralComment[])}
}
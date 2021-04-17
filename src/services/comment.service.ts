import { ArticleComment, FinanceComment, GeneralComment, HistoryComment } from "../models/comments.model";
import { asArray, connect, listAsValues } from "./base.service";
import * as UsersService from './users.service';

export const setComment = async (
    params: { message: string, tickers: string[], tags: string[], type?: string, specialization: string }
): Promise<{ results?: GeneralComment[], error?: Error }> => {
    const db = await connect();

    const user_id = await UsersService.getCurrentUserId();

    let queries: string[] = [];

    queries.push(
        `INSERT INTO comments 
            (user_id, created_at, last_updated_at, message)
        VALUES
            (${user_id}, NOW(), NOW(), '${params.message}')`
    );

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
    return { results: (asArray(rows) as GeneralComment[]) }
}

export const getComments = async (
    params: { uID?: number, tickers: string[], tags: string[], type?: string, specialization?: string }
): Promise<{ results?: GeneralComment[], error?: Error }> => {

    const db = await connect();

    const select = [
        'comments.comment_id',
        'users.name as author',
        // `CONCAT(comments.last_updated_at, '.000+00:00') as last_updated_at`,
        '(UNIX_TIMESTAMP(comments.last_updated_at) * 1000) as last_updated_at',
        'comments.message',
        'GROUP_CONCAT(DISTINCT comment_tickers.ticker SEPARATOR \',\') as tickers'
    ];
    const inner_join = [
        'users using(user_id)',
        'comment_tickers using (comment_id)'
    ];
    const where = [
        `comment_id in
            (SELECT DISTINCT comment_id FROM comments INNER JOIN comment_tickers using (comment_id) WHERE comment_tickers.ticker in ${listAsValues(params.tickers)})`
        // alternatively, can do:
        // `comment_tickers.ticker in ${listAsValues(params.tickers)}`
    ]

    if (params.tags) {
        select.push('GROUP_CONCAT(DISTINCT comment_tags.tag SEPARATOR \',\') as tags');
        inner_join.push('comment_tags using (comment_id)');
        where.push(`comment_id in
            (SELECT DISTINCT comment_id FROM comments INNER JOIN comment_tags using (comment_id) WHERE comment_tags.tag in ${listAsValues(params.tags)})`);
        // alternatively, can do:
        // where.push(`comment_tags.tag in ${listAsValues(params.tags)}`);
    }
    if (params.type && params.type == 'finance') {
        select.push('finance_comments.fiscal_year');
        inner_join.push('finance_comments using (comment_id)');
        if (params.specialization) where.push(`finance_comments.fiscal_year=${Number(params.specialization)}`);
    }
    if (params.type && params.type == 'article') {
        select.push('article_comments.url');
        inner_join.push('article_comments using (comment_id)');
        if (params.specialization) where.push(`article_comments.url='${params.specialization}'`);
    }
    if (params.type && params.type == 'history') {
        select.push('history_comments.trade_date');
        inner_join.push('history_comments using (comment_id)');
        if (params.specialization) where.push(`history_comments.trade_date=CAST('${params.specialization}' as datetime)`)
    }
    if (params.uID) {
        where.push(`comments.user_id=${params.uID}`);
    }
    const query =
        `
        SELECT DISTINCT
            ${select.join(',')}
        FROM comments
        INNER JOIN
            ${inner_join.join(' INNER JOIN ')}
        WHERE
            ${where.join(' AND ')}
        GROUP BY
            comment_id
    `;

    // const query = 
    //     `
    //         SELECT DISTINCT
    //             ${select.join(',')}
    //         FROM comments
    //         INNER JOIN users using(user_id)
    //         INNER JOIN comment_tickers using (comment_id)
    //         ${params.tags ? 'INNER JOIN comment_tags using (comment_id)': ''}
    //         ${params.type && params.type == 'finance' ? 'INNER JOIN finance_comments using (comment_id)' : ''}
    //         ${params.type && params.type == 'article' ? 'INNER JOIN article_comments using (comment_id)' : ''}
    //         ${params.type && params.type == 'history' ? 'INNER JOIN history_comments using (comment_id)' : ''}
    //         WHERE comment_tickers.ticker in ${listAsValues(params.tickers)}
    //         ${params.uID ? `AND comments.user_id=${params.uID}` : ''}
    //         ${params.tags ? `AND comment_tags.tag in ${listAsValues(params.tags)}`: ''}
    //         ${params.type && params.type == 'finance' && params.specialization
    //             ? `AND finance_comments.fiscal_year=${Number(params.specialization)}` : ''}
    //         ${params.type && params.type == 'article' && params.specialization
    //             ? `AND article_comments.url='${params.specialization}'` : ''}
    //         ${params.type && params.type == 'history' && params.specialization
    //             ? `AND history_comments.trade_date=CAST('${params.specialization}' as datetime)` : ''}
    //     `;

    let rows, fields;

    await db.beginTransaction();
    try {
        [rows, fields] = await db.execute(query);
        db.commit();
    } catch (e) {
        db.rollback();
        return { error: e }
    }

    db.destroy();

    rows = asArray(rows).map(row => {
        if (params.tags) {
            return { ...row, "last_updated_at": new Date(row.last_updated_at), "tickers": row.tickers.split(','), "tags": row.tags.split(',') }
        } else {
            return { ...row, "last_updated_at": new Date(row.last_updated_at), "tickers": row.tickers.split(',') }
        }
    });

    // asArray(rows).forEach(comment => console.log(JSON.stringify(comment)));

    switch (params.type) {
        case 'finance': {
            return { results: (asArray(rows) as FinanceComment[]) }
        }
        case 'article': {
            return { results: (asArray(rows) as ArticleComment[]) }
        }
        case 'history': {
            return { results: (asArray(rows) as HistoryComment[]) }
        }
        default: {
            return { results: (asArray(rows) as GeneralComment[]) }
        }
    }
}
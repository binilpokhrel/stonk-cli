import * as dotenv from "dotenv";
import { createConnection } from "mysql2/promise";
dotenv.config();

export const connect = async () => {
    return createConnection({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PWD || "root",
        database: process.env.DB_NAME || "test_db",
        port: Number(process.env.PORT || "3307")
    });
}

export const listAsValues = (arr: string[]) => {
    return '(' + arr.map(el => `'${el}'`).join(",") + ')';
}

export const limitIfExists = (limit?: number) => {
    return limit && limit > 0 ? 'limit ' + limit : '';
}

export const asArray = (result: any) => {
    return result instanceof Array ? result : [result];
}
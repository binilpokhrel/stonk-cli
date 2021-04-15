import { Users } from "../models/users.model";
import { connect } from "./base.service";
import { readFileSync } from 'fs';

export const getUserData = async (name: string) => {
    const db = await connect();

    const query =
        `SELECT * FROM users where name="${name}"`;

    console.log(query);

    const [rows, fields] = await db.execute(query);
 
    db.destroy();
    
    if ((rows as Users[]).length != 1) {
        return null;
    }

    return (rows as Users[])[0];
}

export const registerUser = async (name: string, priv: boolean) => {
    const db = await connect();

    const query =
        `INSERT INTO users (name, priv) VALUES ("${name}", ${priv ? 1 : 0})`;

    console.log(query);

    const [rows, fields] = await db.execute(query);
 
    db.destroy();

    return;
}

export const getCurrentUser = async () => {
    const data = readFileSync('config.txt').toString();
    return data.split(",");
}

export const getCurrentUserId = async () => {
    return (await getCurrentUser())[0];
}

export const getCurrentUserName = async () => {
    return (await getCurrentUser())[1];
}

export const getCurrentUserPriv = async () => {
    return (await getCurrentUser())[2];
}
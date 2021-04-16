import { CompanyAnnualFinances } from "../models/finances.model";
import { connect } from "./base.service";

export const getFinancialData = async (ticker: string, year: string, type: keyof CompanyAnnualFinances) => {
    const db = await connect();

    const query =
        `SELECT ${type} FROM company_annual_finances where ticker="${ticker}" and fiscal_year=${year}`;

    const [rows, fields] = await db.execute(query);
 
    db.destroy();
    
    if ((rows as CompanyAnnualFinances[]).length != 1) {
        return Error;
    }

    return (rows as CompanyAnnualFinances[])[0][type];
}

export interface Comment {
    comment_id: number,
    user_id: number,
    created_at: Date,
    last_updated_at: Date,
    message: string,
    tickers?: string[],
    tags?: string[]
}

export interface GeneralComment extends Comment {
    null: null
}

export interface FinanceComment extends Comment {
    fiscal_year: number
}

export interface ArticleComment extends Comment {
    url: string
}

export interface HistoryComment extends Comment {
    trade_date: Date
}
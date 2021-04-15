export interface TradeHistory {
    ticker: string,
    trade_date: Date,
    volume: number,
    open: number,
    high: number,
    low: number,
    close: number,
    adj_close: number
}
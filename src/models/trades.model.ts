export interface TradeHistory {
    ticker: string,
    trade_date: Date,
    volume: number,
    open: number,
    high: number,
    low: number,
    close: number,
    adjclose: number
}
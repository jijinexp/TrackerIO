export interface Transaction {
    id: string,
    csvId: string,
    date: string,
    description: string,
    type: string,
    bank: string,
    amount: number
}

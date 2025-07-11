export interface OrderHeader {
    orderNumber: string;
    date: string;
    customer: string;
}

export interface OrderLine {
    id: number;
    item: string;
    amount: number;
    validated: boolean;
    unitPrice: number;
}


export interface Order {
    orderHeader: OrderHeader;
    orderLines: OrderLine[];
}

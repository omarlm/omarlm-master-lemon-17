import { Order } from './order';

export const initialOrder: Order = {
    orderHeader: {
        orderNumber: '001',
        date: '01/01/2025',
        customer: 'Customer Name',
    },
    orderLines: [
        { id: 1, item: 'Item Name 1', amount: 100, validated: false, unitPrice: 50 },
        { id: 2, item: 'Item Name 2', amount: 50, validated: true, unitPrice: 25 },
    ],
};

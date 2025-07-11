import { Order } from "../models/order";

export const calculateTotalAmount = (order: Order): number => {
    return order.orderLines.reduce((total, line) => total + line.amount, 0);
};

export const calculatedOrderStatus = (order: Order): number => {
    if (order.orderLines.length === 0) {
        return 0;
    }

    const validateCount = order.orderLines.filter(line => line.validated).length;
    return (validateCount / order.orderLines.length) * 100;
}
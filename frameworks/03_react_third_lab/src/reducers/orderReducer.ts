import { Order } from "../models/order";

export type OrderAction =
    | { type: 'UPDATE_LINE_AMOUNT'; payload: { id: number; amount: number } }
    | { type: 'TOGGLE_LINE_VALIDATION'; payload: { id: number } }
    | { type: 'UPDATE_MULTIPLE_VALIDATIONS'; payload: { ids: number[]; validated: boolean } }

export const orderReducer = (state: Order, action: OrderAction): Order => {
    switch (action.type) {
        case 'UPDATE_LINE_AMOUNT':
            return {
                ...state,
                orderLines: state.orderLines.map(line =>
                    line.id === action.payload.id ? { ...line, amount: action.payload.amount } : line
                ),
            };

        case 'TOGGLE_LINE_VALIDATION':
            return {
                ...state,
                orderLines: state.orderLines.map(line =>
                    line.id === action.payload.id ? { ...line, validated: !line.validated } : line
                ),
            };

        case 'UPDATE_MULTIPLE_VALIDATIONS':
            return {
                ...state,
                orderLines: state.orderLines.map(line =>
                    action.payload.ids.includes(line.id)
                        ? { ...line, validated: action.payload.validated }
                        : line
                ),
            };

        default:
            return state;
    }
};

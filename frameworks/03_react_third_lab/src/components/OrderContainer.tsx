import { useReducer } from 'react';
import { orderReducer } from '../reducers/orderReducer';
import { initialOrder } from '../models/orderModel';
import OrderHeader from './OrderHeader';
import OrderDetails from './OrderDetails';

const OrderContainer: React.FC = () => {
    const [order, dispatch] = useReducer(orderReducer, initialOrder);

    const totalAmount = order.orderLines.reduce((total, line) => total + line.amount, 0);
    const validatedCount = order.orderLines.filter(line => line.validated).length;
    const orderStatus = order.orderLines.length > 0
        ? (validatedCount / order.orderLines.length) * 100
        : 0;

    const allValidated = order.orderLines.length > 0 && order.orderLines.every(line => line.validated);

    const handleSelectAll = () => {
        const newValidated = !allValidated;
        const ids = order.orderLines.map(line => line.id);
        dispatch({ type: 'UPDATE_MULTIPLE_VALIDATIONS', payload: { ids, validated: newValidated } });
    };

    return (
        <div>
            <OrderHeader
                orderHeader={order.orderHeader}
                totalAmount={totalAmount}
                orderStatus={orderStatus}
                onSendOrder={() => alert("Order sent")}
                allValidated={allValidated}
                onSelectAll={handleSelectAll}
            />

            <OrderDetails
                orderLines={order.orderLines}
                dispatch={dispatch}
            />
        </div>
    );
};

export default OrderContainer;

import { OrderHeader as OrderHeaderType } from '../models/order';

interface OrderHeaderProps {
    orderHeader: OrderHeaderType;
    totalAmount: number;
    orderStatus: number;
    onSendOrder?: () => void;
    allValidated: boolean;
    onSelectAll: () => void;
}

const OrderHeader: React.FC<OrderHeaderProps> = ({
    orderHeader,
    totalAmount,
    orderStatus,
    onSendOrder,
    allValidated,
    onSelectAll,
}) => {
    return (
        <div className="p-4 bg-gray-100 rounded shadow">
            {/* Información de la cabecera */}
            <div>
                <h2 className="text-2xl font-bold mb-2">Order {orderHeader.orderNumber}</h2>
                <p className="mb-1">Date: {orderHeader.date}</p>
                <p className="mb-1">Customer: {orderHeader.customer}</p>
                <p className="mb-1">Total Amount: €{totalAmount}</p>
                <p className="mb-1">Status: {orderStatus.toFixed(2)}%</p>
            </div>

            <div className="mt-4">
                <div className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        checked={allValidated}
                        onChange={onSelectAll}
                        className="h-5 w-5 text-blue-600"
                    />
                    <label className="ml-2 text-sm text-gray-700">Select All</label>
                </div>
                <button
                    onClick={() => onSendOrder ? onSendOrder() : alert("Order sent")}
                    disabled={orderStatus < 100}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer"
                >
                    Send Order
                </button>
            </div>
        </div>
    );
};

export default OrderHeader;

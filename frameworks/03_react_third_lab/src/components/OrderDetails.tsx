// src/components/OrderDetails.tsx
import React from 'react';
import { OrderLine } from '../models/order';
import { OrderAction } from '../reducers/orderReducer';

interface OrderDetailsProps {
    orderLines: OrderLine[];
    dispatch: React.Dispatch<OrderAction>;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderLines, dispatch }) => {
    const handleAmountChange = (id: number, newAmount: number) => {
        dispatch({ type: 'UPDATE_LINE_AMOUNT', payload: { id, amount: newAmount } });
    };

    const handleToggleValidation = (id: number) => {
        dispatch({ type: 'TOGGLE_LINE_VALIDATION', payload: { id } });
    };

    const allValidated = orderLines.length > 0 && orderLines.every(line => line.validated);

    const handleSelectAll = () => {
        const newValidated = !allValidated;
        const ids = orderLines.map(line => line.id);
        dispatch({ type: 'UPDATE_MULTIPLE_VALIDATIONS', payload: { ids, validated: newValidated } });
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Order Details</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <input
                                    type="checkbox"
                                    checked={allValidated}
                                    onChange={handleSelectAll}
                                    className="h-5 w-5 text-blue-600"
                                />
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Item
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Unit Price (€)
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Price (€)
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orderLines.map((line) => (
                            <tr key={line.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <input
                                        type="checkbox"
                                        checked={line.validated}
                                        onChange={() => handleToggleValidation(line.id)}
                                        className="h-5 w-5 text-blue-600"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                    {line.item}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {line.unitPrice} €
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <input
                                        type="number"
                                        value={line.amount}
                                        onChange={(e) =>
                                            handleAmountChange(line.id, Number(e.target.value))
                                        }
                                        className="w-24 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetails;

import React from "react";

interface ItemListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    onItemClick?: (item: T) => void;
}

const ItemList = <T,>({ items, renderItem, onItemClick }: ItemListProps<T>) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    onClick={() => onItemClick?.(item)}
                    className="cursor-pointer"
                >
                    {renderItem(item)}
                </div>
            ))}
        </div>
    );
};

export default ItemList;

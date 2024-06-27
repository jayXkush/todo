// hooks/useDragAndDrop.ts

import { useCallback, useState } from 'react';

export interface Item {
  id: string;
  text: string;
  category: string;
}

export const useDragAndDrop = (initialItems: Item[]) => {
  const [items, setItems] = useState<Item[]>(initialItems);

  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);
    setItems(updatedItems);
  }, [items]);

  const addItem = (text: string, category: string) => {
    setItems([...items, { id: `${items.length}`, text, category }]);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return { items, moveItem, addItem, deleteItem };
};

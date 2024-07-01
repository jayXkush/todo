"use client"
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDragAndDrop } from './useDragAndDrop';

type Category = 'Food' | 'Electronics' | 'Clothes';

interface DragItem {
  id: string;
  text: string;
  category: Category;
}

const categories: Category[] = ['Food', 'Electronics', 'Clothes'];

const ItemType = 'ITEM';

interface DraggableItemProps {
  item: DragItem;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  deleteItem: (id: string) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  item,
  index,
  moveItem,
  deleteItem,
}) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="flex justify-between p-3 mb-2 bg-white rounded shadow"
    >
      <span>
        {item.text} - {item.category}
      </span>
      <button
        onClick={() => deleteItem(item.id)}
        className="ml-4 text-red-500"
      >
        Delete
      </button>
    </div>
  );
};

const Home: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  );

  const { items, moveItem, addItem, deleteItem } = useDragAndDrop([]);

  const handleAddItem = () => {
    if (inputText.trim() === '') return;
    addItem(inputText, selectedCategory);
    setInputText('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="p-6 bg-white rounded shadow-md w-full max-w-md">
        <h1 className="mb-4 text-2xl font-bold text-center">Todo List</h1>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter item"
            className="flex-grow p-2 border border-gray-300 rounded"
          />
          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value as Category)
            }
            className="p-2 border border-gray-300 rounded"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddItem}
            className="p-2 text-white bg-blue-500 rounded"
          >
            Add
          </button>
        </div>
        <DndProvider backend={HTML5Backend}>
          <div className="p-4 bg-gray-100 rounded min-h-[200px]">
            {items.map((item, index) => (
              <DraggableItem
                key={item.id}
                index={index}
                item={item}
                moveItem={moveItem}
                deleteItem={deleteItem}
              />
            ))}
          </div>
        </DndProvider>
      </div>
    </div>
  );
};

export default Home;

"use client";
import React, { useState, useEffect } from 'react';

enum Category {
  Electronics = 'Electronics',
  Food = 'Food',
  Mechanics = 'Mechanics',
  Clothes = 'Clothes',
  Toys = 'Toys'
}

interface Item {
  id: string;
  content: string;
  category: Category;
}

const categories: readonly Category[] = Object.values(Category);

const App: React.FC = (): JSX.Element => {
  const [input, setInput] = useState<string>('');
  const [category, setCategory] = useState<Category>(categories[0]);
  const [list, setList] = useState<readonly Item[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.add('bg-gray-900', 'text-white');

    return () => {
      document.body.classList.remove('bg-gray-900', 'text-white');
    };
  }, []);

  const addItem = (): void => {
    if (!input.trim()) {
      alert("Please enter a value.");
      return;
    }
    const newItem: Item = {
      id: `${list.length}-${input}`,
      content: input,
      category,
    };
    setList(prev => [...prev, newItem]);
    setInput('');
  };

  const deleteItem = (id: string): void => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setList(prev => prev.filter(item => item.id !== id));
    }
  };

  const onDragStart = (id: string): void => {
    setDraggedItem(id);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>, index: number): void => {
    event.preventDefault();
    if (draggedItem === null) return;

    const dragIndex = list.findIndex(item => item.id === draggedItem);
    if (dragIndex === -1) return;

    const updatedList = Array.from(list);
    const [dragged] = updatedList.splice(dragIndex, 1);
    updatedList.splice(index, 0, dragged);

    setList(updatedList);
    setDraggedItem(null);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg mt-12">
      <div className="flex space-x-3 mb-5">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add item"
          className="flex-1 p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-400"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-400"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-gray-700 text-white">
              {cat}
            </option>
          ))}
        </select>
        <button
          onClick={addItem}
          className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
        >
          Add
        </button>
      </div>
      <div className="bg-gray-700 p-5 rounded shadow-inner min-h-[120px]">
        {list.map((item, idx) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => onDragStart(item.id)}
            onDragOver={onDragOver}
            onDrop={(event) => onDrop(event, idx)}
            className="flex justify-between items-center p-3 mb-3 bg-gray-600 border border-gray-500 rounded"
          >
            <span className="text-white">{item.content} ({item.category})</span>
            <button
              onClick={() => deleteItem(item.id)}
              className="text-red-500 hover:text-red-700 focus:outline-none focus:ring focus:ring-red-400"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

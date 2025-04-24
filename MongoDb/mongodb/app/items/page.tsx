'use client'
import { useEffect, useState } from 'react';

interface Item {
  _id: string;
  name: string;
}

const Home = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch('/api/items');
      const data = await res.json();
      setItems(data);
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

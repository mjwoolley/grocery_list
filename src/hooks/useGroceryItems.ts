import { useState, useEffect } from 'react';
import { 
  ref, 
  push, 
  onValue, 
  update, 
  remove,
  query,
  orderByChild
} from 'firebase/database';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';
import { GroceryItem } from '../types';

export const useGroceryItems = () => {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    const itemsRef = ref(database, 'grocery-items');
    const itemsQuery = query(itemsRef, orderByChild('createdAt'));

    const unsubscribe = onValue(
      itemsQuery,
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const itemsArray: GroceryItem[] = Object.keys(data).map(key => ({
              ...data[key],
              id: key
            }));
            setItems(itemsArray);
          } else {
            setItems([]);
          }
          setLoading(false);
        } catch (err: any) {
          setError(err.message);
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const addItem = async (name: string): Promise<void> => {
    if (!user || !name.trim()) return;

    try {
      setError(null);
      const itemsRef = ref(database, 'grocery-items');
      const newItem: Omit<GroceryItem, 'id'> = {
        name: name.trim(),
        completed: false,
        createdAt: Date.now(),
        createdBy: user.uid
      };
      
      await push(itemsRef, newItem);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleItem = async (itemId: string, completed: boolean): Promise<void> => {
    if (!user) return;

    try {
      setError(null);
      const itemRef = ref(database, `grocery-items/${itemId}`);
      await update(itemRef, { completed });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteItem = async (itemId: string): Promise<void> => {
    if (!user) return;

    try {
      setError(null);
      const itemRef = ref(database, `grocery-items/${itemId}`);
      await remove(itemRef);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const clearCompletedItems = async (): Promise<void> => {
    if (!user) return;

    try {
      setError(null);
      const completedItems = items.filter(item => item.completed);
      const deletePromises = completedItems.map(item => deleteItem(item.id));
      await Promise.all(deletePromises);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const activeItems = items.filter(item => !item.completed);
  const completedItems = items.filter(item => item.completed);

  return {
    items,
    activeItems,
    completedItems,
    loading,
    error,
    addItem,
    toggleItem,
    deleteItem,
    clearCompletedItems
  };
};
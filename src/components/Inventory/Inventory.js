import { useState, useEffect } from 'react';
import {
  createItem,
  retrieveItems,
  updateItem,
  deleteItem
} from '../../services/api-service';
import AddItem from '../AddItem/AddItem';
import ItemRow from '../ItemRow/ItemRow';
import styles from './Inventory.module.css';

export function Inventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // TODO catch and schedule a retry
    updateItems();
  }, []);

  function updateItems() {
    retrieveItems()
      .then(response => setItems(response))
      .catch(err => console.error(err));
  }

  async function doCreateItem(data) {
    const newItem = await createItem(data);
    setItems((prevItems) => [...prevItems, newItem]);
  }

  function doDeleteItem(itemId) {
    setItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    deleteItem(itemId);
  }

  function doUpdateItem(itemId, data) {
    setItems((prevItems) => prevItems.map((item) => {
      if (item.id === itemId) {
        return ({ ...item, ...data });
      } else {
        return item;
      }
    }));

    // TODO maybe check return and use that?
    updateItem(itemId, data);
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td className={styles.col1}>Name</td>
            <td className={styles.col2}>Price</td>
            <td className={styles.col3}>Quantity</td>
            <td className={styles.col4}>Actions</td>
          </tr>
        </thead>
        <tbody>
          <AddItem doCreateItem={doCreateItem} />
          {items.length ? items.map((item) => <ItemRow
            key={item.id}
            item={item}
            doCreateItem={doCreateItem}
            doDeleteItem={doDeleteItem}
            doUpdateItem={doUpdateItem} />
          )
          :
          <tr><td>No items</td></tr>}
        </tbody>
      </table>

    </div>
  );
}

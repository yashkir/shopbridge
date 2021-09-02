import { useState, useEffect } from 'react';
import {
  createItem,
  retrieveItems,
  updateItem,
  deleteItem
} from '../../services/api-service';
import { AddItem } from "../AddItem/AddItem";
import { ItemRow } from "../ItemRow/ItemRow";

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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "left" }}>
      <AddItem doCreateItem={doCreateItem} />

      <table>
        {items.length ? items.map((item) => <ItemRow
          key={item.id}
          item={item}
          doCreateItem={doCreateItem}
          doDeleteItem={doDeleteItem}
          doUpdateItem={doUpdateItem} />
        )
          :
          <div>No items</div>}
      </table>

    </div>
  );
}

import './App.css';
import { useState, useEffect } from 'react';
import {
  createItem,
  retrieveItems,
  updateItem,
  deleteItem,
} from './services/api-service';

function AddItem({ doCreateItem }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    
    // TODO validate here
    doCreateItem(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <input
        type="number"
        placeholder="item price"
        value={formData.price}
        onChange={(e) => setFormData({...formData, price: e.target.value})}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}

function EditItem({ item, doUpdateItem }) {
  const [formData, setFormData] = useState({
    name: item.name,
    price: item.price,
  });

  function handleSubmit(e) {
    e.preventDefault();
    
    // TODO validate here
    doUpdateItem(item.id, formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <input
        type="number"
        placeholder="item price"
        value={formData.price}
        onChange={(e) => setFormData({...formData, price: e.target.value})}
        required
      />
      <button type="submit">Update</button>
    </form>
  );
}

function Inventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // TODO catch and schedule a retry
    retrieveItems()
      .then(response => setItems(response));
  }, []);

  async function doCreateItem(data) {
    const newItem = await createItem(data);
    setItems((prevItems) => [...prevItems, newItem]);
  }

  function doDeleteItem(itemId) {
    setItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    deleteItem(itemId);
  }

  function doUpdateItem(itemId, data) {
    setItems((prevItems) => prevItems.map((item) => 
      {
        if (item.id === itemId) {
          return ({...item, ...data});
        } else {
          return item;
        }
      }));

    // TODO maybe check return and use that?
    updateItem(itemId, data);
  }

  return (
    <div>
      <AddItem doCreateItem={doCreateItem}/>
      {items.length ? items.map((item) =>
        <div key={item.id}>
          {item.name}
          <br />
          {item.price}
          <br />
          <button onClick={(e) => doDeleteItem(item.id)}>X</button>
          <EditItem 
            item={item}
            doUpdateItem={doUpdateItem}
          />
        </div>
      )
      :
        <div>No items</div>
      }

    </div>
  );
  
}

function App() {
  return (
    <div className="App">
      <h1>Product Admin</h1>
      <Inventory />
    </div>
  );
}

export default App;

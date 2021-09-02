import { useState } from 'react';


export function AddItem({ doCreateItem }) {
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
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required />
      <input
        type="number"
        placeholder="item price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        required />
      <button type="submit">Add</button>
    </form>
  );
}
